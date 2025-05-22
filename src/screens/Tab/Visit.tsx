import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  AddVisitBottomSheet,
  Box, EndVisitBottomSheet, FloatingButton,
  hideFullScreenProgress,
  showFullScreenProgress,
  TabButtons,
  VisitCard,
} from '@/component';
import {Search} from '@/component/Search';
import {EndVisitApiParams, GetVisitListApiParams, SaveVisitApiParams} from '@/api';
import {actions, RootState, useAppSelector} from '@/redux/root.store';
import {AddVisitModel, GetVisitList, UserModel} from '@/model';
import {DeviceHelper} from '@/helper';
import {ActivityIndicator, FlatList, Linking, RefreshControl} from 'react-native';
import {useForm} from 'react-hook-form';
import {AddVisitFormIds, customFormGenerator, EndVisitIDs} from '@/customFormGenerator';
import Geolocation from '@react-native-community/geolocation';
import _ from 'lodash';
import { IWaveformRef, PermissionStatus, RecorderState, UpdateFrequency, useAudioPermission } from '@simform_solutions/react-native-audio-waveform';
import {AddVisitDto,  UserDetailDto} from "@/dtos";
import {SvgIcon} from "@/assets/SvgIcon";
import {showErrorMessage} from "@/core";
import {utils} from "@/utils/Utils";
import {leaveStore} from "@/stores";
import {observer} from "mobx-react";
import {useTheme} from "@shopify/restyle";
import {Theme} from "@/style";



export const Visit:React.FC = observer( () =>{
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const {colors} = useTheme<Theme>()
  const getVisitResult = useAppSelector((state:RootState) => state.visitDetail.getVisitList);
  const getAddVisitResult = useAppSelector((state:RootState) => state.visitDetail.addVisit);
  const getUserDetailResult = useAppSelector((state:RootState) => state.loginDetail.LoginResult);
  const [selectedId,setSelectedId]=useState('')
  const [isVisitEnd, setIsVisitEnd] = useState(false);
  const [recorderState, setRecorderState] = useState(RecorderState.stopped);
  const [isVisibleAddVisit, setIsVisibleAddVisit] = useState(false);
  const ref = useRef<IWaveformRef>(null);
  const [list, setList] = useState('');
  const [loadingBottom, setLoadingBottom] = useState(false);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  const renderFooter = () => {
    return (
        <Box>
          {loadingBottom && <ActivityIndicator size="small" color="#557A19" />}
        </Box>
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    apiCall(0,selectedTab)
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const fetchMoreData = () => {
    let pageNo = page + 1;
    const totalPage = 1000;
    if (totalPage >= pageNo) {
      setPage(pageNo);
      apiCall(leaveStore?.getVisitList?.items.length,selectedTab);
    }
  };

  const getAddVisit = useMemo(() => {
    if (getAddVisitResult?.isSuccess){
      return getAddVisitResult.getValue()
    }
    return new AddVisitModel({} as AddVisitDto)
  }, [getAddVisitResult]);

  const userDetail = useMemo(() => {
    if (getUserDetailResult?.isSuccess){
      return getUserDetailResult.getValue().userDetail
    }
    return new UserModel({} as UserDetailDto)
  }, []);

  const addVisitForm = useMemo(() => customFormGenerator.generateAddVisitForm(getAddVisit), [getAddVisit]);
  const form = useMemo(() => customFormGenerator.generateVisitForm(), []);

  const [selectedTab, setSelectedTab] = useState('Pending');
  const tabArray = [
    {
      title:'Pending',
    },
    {
      title:'Completed',
    }
  ];

  const handelOnTabPress = (option: string) =>{
    apiCall(0,option)
    setSelectedTab(option);
  };

  const apiCall = async (page:number,visit_status:string,search?:string) =>{
    // showFullScreenProgress()
    const params:GetVisitListApiParams={
      length: 10,
      search: search ?? '',
      start: page,
      visit_status: visit_status === tabArray[0].title ? 1 : 2,
    }
    await actions.getVisitListThunkCallActions(params)
    // hideFullScreenProgress()
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    _.debounce(async (search: string) => {
      await apiCall(0,search);
    }, 500), []);

  useEffect(() => {
    apiCall(0,selectedTab)
  }, []);


  const getVisitList = useMemo(() => {
    if (getVisitResult?.isSuccess){
      return getVisitResult.getValue()
    }
    return new GetVisitList()
  }, [getVisitResult]);

  const handelOnVisitEndApiCall = () =>{

    Geolocation.getCurrentPosition(async position => {
      setIsVisitEnd(false)
      showFullScreenProgress()
      const formData = new FormData()
      if(list){
        formData.append('voice_notes', list)
      }
      const params:EndVisitApiParams = {
        discussion_points: getValues()[EndVisitIDs.discussionPoints],
        e_lat: position.coords.latitude.toString(),
        e_lon: position.coords.longitude.toString(),
        id: selectedId,
      }
      await actions.endVisitThunkCallActions(params,formData).then((value) =>{
        if (value.isSuccess){
          apiCall(0,selectedTab)
          clearVisitForm()
        }
        hideFullScreenProgress()
      })
    },
    async error => {
      showErrorMessage(error.message)
      hideFullScreenProgress()
      setIsVisitEnd(false)
    })

  }

  const {checkHasAudioRecorderPermission, getAudioRecorderPermission} =
  useAudioPermission();

  const startRecording = () => {
    ref.current
      ?.startRecord({
        updateFrequency: UpdateFrequency.high,
      })
      .then(() => {})
      .catch(() => {});
  };

  const handleRecorderAction = async () => {
    if (recorderState === RecorderState.stopped) {
      let hasPermission = await checkHasAudioRecorderPermission();

      if (hasPermission === PermissionStatus.granted) {
        startRecording();
      } else if (hasPermission === PermissionStatus.undetermined) {
        const permissionStatus = await getAudioRecorderPermission();
        if (permissionStatus === PermissionStatus.granted) {
          startRecording();
        }
      } else {
        await Linking.openSettings();
      }
    } else {
      ref.current?.stopRecord().then(path => {

        setList(path);
      });
    }
  };

  const clearVisitForm = ()=>{
    setValue(EndVisitIDs.nextVisit,'')
    setValue(EndVisitIDs.notes,'')
    setValue(EndVisitIDs.date,'')
    setValue(EndVisitIDs.time,'')
    setValue(EndVisitIDs.LeadStage,'')
  }

  const clearAddVisitForm = ()=>{
    setValue(EndVisitIDs.nextVisit,'')
    setValue(EndVisitIDs.notes,'')
    setValue(EndVisitIDs.date,'')
    setValue(EndVisitIDs.time,'')
    setValue(EndVisitIDs.LeadStage,'')
  }

  const addVisitSubmit  = async () =>{
    showFullScreenProgress()
    Geolocation.getCurrentPosition(async position => {
          setIsVisibleAddVisit(false)
          const params:SaveVisitApiParams ={
            emp_id: userDetail.empId,
            party_name: getValues()[AddVisitFormIds.partyName],
            visit_type: getValues()[AddVisitFormIds.visitType],
            id: '0',
            purpose: getValues()[AddVisitFormIds.purpose],
            s_lat: position.coords.latitude.toString(),
            s_lon: position.coords.longitude.toString(),
            contact_person:getValues()[AddVisitFormIds.contactPerson]
          }
          await actions.savaVisitThunkCallActions(params).then(async res =>{
            hideFullScreenProgress()
            if (res.isSuccess){
              clearAddVisitForm()
              const params:GetVisitListApiParams={
                length: 10,
                search: '',
                start: 0,
                visit_status:1
              }
              await actions.getVisitListThunkCallActions(params)
            }
          })
        },
        async error => {
          hideFullScreenProgress()
          showErrorMessage(error.message)
          await utils.handleEnabledPressed()
          setIsVisibleAddVisit(false)
        }
    )
  }

  const handelOnVisitSavaPress = () =>{
    handleSubmit(addVisitSubmit)()
  }


  return (
    <Box
      flex={1}
      backgroundColor={'white'}
    >
      <Search
        onPress={()=>{}}
        onClearText={async ()=>{await apiCall(0,selectedTab)}}
        onTextChange={debouncedUpdate}
        onEndEditing={() =>{}} />

      <Box>
        <TabButtons
          buttons={tabArray}
          selectedTab={selectedTab}
          setSelectedTab={handelOnTabPress}
        />
      </Box>
      <FlatList
        data={leaveStore?.getVisitList?.items}
        onMomentumScrollBegin={() => {
          setOnEndReachedCalledDuringMomentum(false);
        }}
        keyExtractor={item => item.visitId}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <VisitCard
            item={item}
            onEndPress={() =>{
              setSelectedId(item.visitId)
              if (DeviceHelper.isIos()){
                setIsVisitEnd(true)
              }else {
                utils.handleEnabledPressed().then(value => {
                  if (value){
                    setIsVisitEnd(true)
                  }
                })
              }


            }}
          />
        )}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={(
          <SvgIcon
              name={'noData'}
              height={DeviceHelper.calculateWidthRatio(200)}
              width={DeviceHelper.calculateWidthRatio(200)}
              pressableProps={{
                style:{
                  alignSelf:'center',
                  marginTop:35,
                  height:'100%'
                }
              }}
          />
        )}
        ListFooterComponent={(
            <Box height={DeviceHelper.calculateHeightRatio(190)}>
              {renderFooter()}
            </Box>
        )}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum) {
            fetchMoreData(); // LOAD MORE DATA
            setOnEndReachedCalledDuringMomentum(true);
          }
        }}
        refreshControl={
          <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={colors.primary}
              colors={[colors.white]}
              progressViewOffset={40}
          />
        }
      />

      {/*{*/}
      {/*    permissions?.isWrite === '1' && (*/}
              <FloatingButton
                  onPress={async () => {
                    await actions.addVisitThunkCallActions()
                    setIsVisibleAddVisit(true);
                  }}
                  bottom={100}
              />
      {/*    )*/}
      {/*}*/}

      <EndVisitBottomSheet
        onAddVisitPress={handelOnVisitEndApiCall}
        isVisible={isVisitEnd}
        errors={errors}
        control={control}
        fieldArray={form}
        ref={ref}
        onClose={()=>{
          setIsVisitEnd(false)
          clearVisitForm()
        }}
        setValue={setValue}
        onRecorderStateChange={setRecorderState}
        onLongPress={handleRecorderAction}
        onPressOut={handleRecorderAction}
        path={list}
      />

      <AddVisitBottomSheet
          isVisible={isVisibleAddVisit}
          onClose={() =>{
            setIsVisibleAddVisit(false);
            clearAddVisitForm()
          }}
          control={control}
          errors={errors}
          setValue={setValue}
          fieldArray={addVisitForm}
          onAddVisitPress={handelOnVisitSavaPress}
      />

    </Box>
  )
})

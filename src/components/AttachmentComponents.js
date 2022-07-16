import { TextProps, TouchableOpacity, TouchableOpacityProps, ViewProps, StyleSheet, View, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icon } from '@ui-kitten/components';
import { capitalizeWithTruncation, getImageSrc, IsIOS, openLink, roundOff, screenNameConstants, WIDTH } from '../CommonUtils';
import { AppColors, STYLES } from '../../AppStyles';
import { TextComponent } from './index';
import { fontFamilyConstants, fontSizeConstants } from '../extra/constants';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { useNavigation } from '@react-navigation/native';
import { getFileSize } from '../../communication/utils';
import ImagePicker from 'react-native-image-picker';

// interface AttachmentProps {
//     fileList: any;
//     setFileList: any;
//     text: string;
//     textStyle?: TextProps['style'];
//     customButtons?: Array<{
//         name: string;
//         title: string;
//     }>;
//     multiple?: Boolean;
//     maxFilesCount?: number;
//     allowedFileTypes?: any;
//     // maxAllowedFileSize for size in mb
//     maxAllowedFileSize?: number;
//     hintText?: string;
//     customComponent?: React.ReactElement,
//     onlyImage?: boolean;
//     loading?: boolean;
//     setLoading?(boolean): any;
//     hasPermission?: boolean;
//     customButtonTitle?: string;
// }

// interface fileResponse {
//     fileSize?: number;
//     // below will be used post api response of uploadfile api
//     fileName?: string;
//     link?: string;
//     uploadedBy?: string;
//     path?: string;
//     _id?: string;
// }

// export interface AttachmentFileProps extends fileResponse, DocumentPickerResponse {

// }

const defaultAllowedFileTypes = [
    DocumentPicker.types.images,
    DocumentPicker.types.pdf,
    DocumentPicker.types.csv,
    DocumentPicker.types.doc,
    DocumentPicker.types.docx,
    DocumentPicker.types.xls,
    DocumentPicker.types.xlsx,
    // below file types are only used in Assignment, hence commenting here and sending as props in Add Assignment screen
    // DocumentPicker.types.ppt, 
    // DocumentPicker.types.pptx,
    // DocumentPicker.types.plainText
]

const AllPlatformFileTypes = {
    // Android
    mimeTypes: {
        allFiles: '*/*',
        audio: 'audio/*',
        csv: 'text/csv',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        images: 'image/*',
        pdf: 'application/pdf',
        plainText: 'text/plain',
        ppt: 'application/vnd.ms-powerpoint',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        video: 'video/*',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        zip: 'application/zip',
    },
    // iOS
    utis: {
        allFiles: 'public.item',
        audio: 'public.audio',
        csv: 'public.comma-separated-values-text',
        doc: 'com.microsoft.word.doc',
        docx: 'org.openxmlformats.wordprocessingml.document',
        images: 'public.image',
        pdf: 'com.adobe.pdf',
        plainText: 'public.plain-text',
        ppt: 'com.microsoft.powerpoint.ppt',
        pptx: 'org.openxmlformats.presentationml.presentation',
        video: 'public.movie',
        xls: 'com.microsoft.excel.xls',
        xlsx: 'org.openxmlformats.spreadsheetml.sheet',
        zip: 'public.zip-archive',
    },
    // web
    extensions: {
        allFiles: '*',
        audio: '.3g2 .3gp .aac .adt .adts .aif .aifc .aiff .asf .au .m3u .m4a .m4b .mid .midi .mp2 .mp3 .mp4 .rmi .snd .wav .wax .wma',
        csv: '.csv',
        doc: '.doc',
        docx: '.docx',
        images: '.jpeg .jpg .png',
        pdf: '.pdf',
        plainText: '.txt',
        ppt: '.ppt',
        pptx: '.pptx',
        video: '.mp4',
        xls: '.xls',
        xlsx: '.xlsx',
        zip: '.zip .gz',
        folder: 'folder',
    }
}

const getKeyByValue = (value) => {
    // for all Platfors(Android, iOS, Web)
    // since all keys are same only mimeTypes is used here(folder in extensions alone will be excluded)
    let foundKey = Object.keys(AllPlatformFileTypes.mimeTypes).find(key => AllPlatformFileTypes.mimeTypes[key] === value || AllPlatformFileTypes.utis[key] === value || AllPlatformFileTypes.extensions[key] === value);

    return foundKey
}


export const AttachmentButton = (props) => {
    const { fileList, onPress, setFileList, style, text, textStyle, customButtons, multiple, maxFilesCount, allowedFileTypes, maxAllowedFileSize, hintText, customComponent, onlyImage, loading, setLoading: setLoadingProps, disabled = false, hasPermission = true, customButtonTitle, beforeOpen = undefined } = props

    const setLoading = (value) => {
        setLoadingProps && setLoadingProps(value)
    }
    const openDocumentPicker = multiple ? DocumentPicker.pickMultiple : DocumentPicker.pick
    const [allowedFileFormats, setAllowedFileFormats] = useState([])

    const imagePicker = async () => {
        try {
            setLoading(true)
            ImagePicker.showImagePicker({
                title: customButtonTitle,
                // customButtons: [{ name: 'Document', title: 'Upload Image' }],
                customButtons: customButtons ? customButtons : [],
                // maxFileSize: 3423356,
                quality: 0.5,
            },
                async response => {
                    // console.log('Response = ', response);
                    if (response.didCancel) {
                        setLoading(false)
                    } else if (response.error) {
                        setLoading(false)
                    } else if (response.customButton) {
                        addDocument(fileList)
                    } else {

                        if (await checkFiles(response)) {
                            let name
                            if (IsIOS()) {
                                name = response.uri.substring(response.uri.lastIndexOf('/') + 1).replace(/ /g, "_")
                            } else {
                                name = response.fileName.replace(/ /g, "_")
                            }
                            // console.log('inside', await checkFiles(response))
                            // setting both single file and multiple files as array
                            multiple ? setFileList([...fileList, { ...response, fileName: name, name }]) : setFileList([...fileList, { ...response, fileName: name, name }])
                        }
                        setLoading(false)
                    }
                })

        } catch (err) {
            // console.log('document error', err)
            setLoading(false)
        }
    }

    useEffect(() => {
        // since 'image/png', 'image/jpeg', 'image/jpg' are included as 'images/*', have to use regex. but used direct values in isValid File
        let tempFileFormatArray = ['image/png', 'image/jpeg', 'image/jpg'],
            fileTypes = allowedFileTypes ? allowedFileTypes : defaultAllowedFileTypes;
        fileTypes.map(item => {
            let key = getKeyByValue(item)
            tempFileFormatArray = [
                ...tempFileFormatArray,
                AllPlatformFileTypes.mimeTypes[key],
                AllPlatformFileTypes.utis[key],
                AllPlatformFileTypes.extensions[key],
            ]
        })
        setAllowedFileFormats(tempFileFormatArray)
    }, [])

    const isValidFile = async ({ fileSize, fileResponse }) => {
        if (fileSize > maxAllowedFileSize) {
            alert(`Maximum allowed file size is ${roundOff(maxAllowedFileSize / 1000000)} MB`);
            return false;
        }

        if (allowedFileFormats && !allowedFileFormats.includes(fileResponse?.type)) {
            alert('Unsupported format')
            return false;
        }
        return true
    }

    const checkMultipleFiles = async (fileResponse) => {
        let i = 0, fileSize, flag = true;
        do {
            const response = fileResponse[i]
            if (response?.fileSize) {
                fileSize = response?.fileSize
            } else {
                fileSize = response?.size
            }
            console.log({ response })
            if (!(await isValidFile({ fileSize, fileResponse: response }) && flag)) {
                flag = false
                break;
            }
            i++;
        } while (flag && i < fileResponse.length)

        return flag
    }

    const checkFiles = async (response) => {
        //fileResponse = {
        //fileCopyUri: "file:///Users/arun/Library/Developer/CoreSimulator/Devices/D627485D-B249-454F-9EE3-711B0D5EA0F0/data/Containers/Data/Application/355F28CD-4C3F-461B-A661-2456AE87DAF8/tmp/com.finwego.radius-Inbox/dummy.pdf"
        // name: "dummy.pdf"
        // size: 13264
        // type: "application/pdf"
        // uri:
        // }
        if (multiple) {
            const fileResponse = response
            //=> to check the number of files selected by user
            if (fileResponse?.length > maxFilesCount || fileResponse?.length > (maxFilesCount - fileList.length)) {
                alert(`Maximum Number of files allowed is ${maxFilesCount}`);
                return false;
            }
            return await checkMultipleFiles(fileResponse)
        } else {
            let fileSize
            const fileResponse = response
            if (fileResponse?.fileSize) {
                fileSize = fileResponse?.fileSize
            } else {
                fileSize = fileResponse?.size
            }
            if (!(await isValidFile({ fileSize, fileResponse }))) {
                console.log('return here', fileResponse)
                return false
            }
            return true
        }
    }

    const addDocument = async (fileList) => {
        try {
            setLoading(true)
            let res;
            res = await openDocumentPicker({
                type: allowedFileTypes ? allowedFileTypes : defaultAllowedFileTypes,
            });

            // console.log('outside', res)
            if (await checkFiles(res)) {
                // console.log('inside', await checkFiles(res))
                // setting both single file and multiple files as array
                multiple ? setFileList([...fileList, ...res]) : setFileList([...fileList, res])
            }
            setLoading(false)
        } catch (err) {
            // console.log('document error', err)
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
            setLoading(false)
        }
    }

    return <View>
        <TouchableOpacity disabled={!hasPermission} style={[customComponent ? {} : styles.touchableOpacityStyle, style]} onPress={(event) => {
            // if onPress present call the function
            if (onPress) {
                onPress(event)
            } else {
                beforeOpen && beforeOpen();
                // if customButtons array has values then it involves imagePicker, filePicker, Take photo
                if (customButtons?.length > 0) {
                    imagePicker()
                } else {
                    // else check for onlyImage condition to popup only imagePicker
                    if (onlyImage) {
                        imagePicker()
                    } else {
                        // else open addDocument function
                        addDocument(fileList)
                    }
                }
            }
        }}>
            {
                customComponent
                    ? customComponent
                    : <TextComponent style={[styles.textStyle, textStyle]}>{text}</TextComponent>
            }
        </TouchableOpacity>
        {hintText && <TextComponent style={{ color: AppColors.NEW_LIGHT_GRAY, fontSize: fontSizeConstants.RFValue12, marginTop: 5 }}>* {hintText}</TextComponent>}
    </View>

}


// Show one attachment item with format and name, and additional icon if provided
export const AttachmentItem = ({
    item,
    index,
    rightIcon,
    extraText
}) => {
    return <TouchableOpacity
        style={[
            styles.container,
            STYLES.flexRow,
            STYLES.flexAlignItemsCenter
        ]}
        onPress={() => item.link && openLink(item.link)}
    >
        <Image
            source={getImageSrc(item)}
            resizeMode='contain'
        />

        <View style={[styles.attachmentDetails]}>
            <TextComponent style={styles.attachmentName}>
                {capitalizeWithTruncation(item?.fileName || item?.name || '', 30)}
            </TextComponent>
            {
                Boolean(extraText) &&
                <TextComponent style={styles.attachmentExtraText}>
                    {extraText}
                </TextComponent>
            }
        </View>

        {rightIcon ? rightIcon({ item, index }) : null}
    </TouchableOpacity>
};

// Show list of attachments one below the other
export const AttachmentsList = ({
    attachments = [],
    style = {},
    rightIcon = undefined,
    showTitle = true,
    contentContainerStyle = {},
    flatListStyle = {},
    title = '',
    extraText = false
}) => {
    return (
        <View style={[style]}>
            {showTitle && <TextComponent style={styles.headerText}>
                {title ? title : 'Attachments'}
            </TextComponent>}

            <FlatList
                data={attachments}
                keyExtractor={item => item._id || item?.link}
                renderItem={({ item, index }) => (
                    <AttachmentItem
                        item={item}
                        index={index}
                        rightIcon={rightIcon}
                        extraText={extraText ? getFileSize({ bytes: item.size }) : ''}
                    />
                )}
                ItemSeparatorComponent={
                    () => <View style={styles.attachmentSeparator} />
                }
                showsVerticalScrollIndicator={false}
                style={[flatListStyle]}
                // nestedScrollEnabled={false}
                contentContainerStyle={[styles.footer, contentContainerStyle]}
            />
        </View>
    );
};

// Show number of attachments with screen navigation to attachments list
export const AttachmentsContainer = ({
    schedule,
    style = {},
    extraText = false
}) => {
    const navigation = useNavigation();

    return (
        Boolean(
            schedule.attachments
            && schedule.attachments.length > 0
            && schedule.attachments[0].documents
            && schedule.attachments[0].documents.length > 0
        )
            ?
            <TouchableOpacity
                style={[
                    styles.container,
                    STYLES.flexRow,
                    STYLES.flexAlignItemsCenter,
                    { marginBottom: 20 },
                    style
                ]}
                onPress={() => {
                    navigation.navigate(
                        screenNameConstants.SCHEDULE.Attachments,
                        { schedule, extraText }
                    );
                }}
            >
                <Icon
                    name='attach-2-outline'
                    fill={'#454545'}
                    style={styles.clipIcon}
                />
                <TextComponent style={styles.text}>
                    {schedule.attachments[0].documents.length} Attachments
                </TextComponent>
                <Icon
                    name='arrow-ios-forward-outline'
                    style={styles.rightArrowIcon}
                />
            </TouchableOpacity>
            :
            <View />
    );
};

const styles = StyleSheet.create({
    touchableOpacityStyle: {
        height: 50,
        backgroundColor: 'rgba(255, 238, 238, 1)',
        // flex: 1,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E4807E',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: fontSizeConstants.RFValue13
    },
    container: {
        borderRadius: 10,
        borderColor: '#CDCDCD',
        borderWidth: 0.5,
        padding: 14
    },
    text: {
        marginLeft: 10,
        flex: 1,
        color: '#353535',
        fontSize: fontSizeConstants.RFValue13,
        fontFamily: fontFamilyConstants.Bold
    },
    clipIcon: { height: 20, width: 20 },
    rightArrowIcon: { height: 25, width: 25 },
    headerText: {
        fontSize: fontSizeConstants.RFValue14,
        fontFamily: fontFamilyConstants.Bold,
        color: '#353535',
        marginBottom: 15
    },
    attachmentName: {
        color: '#454D61',
        fontSize: fontSizeConstants.RFValue13,
        fontFamily: fontFamilyConstants.Bold
    },
    attachmentSeparator: {
        marginVertical: 8
    },
    attachmentDetails: {
        marginLeft: 12,
        flex: 1,
    },
    attachmentExtraText: {
        marginTop: 8,
        fontSize: fontSizeConstants.RFValue11,
        color: '#787777'
    },
    footer: {
        paddingBottom: 50
    }
})
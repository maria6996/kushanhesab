// import moment from 'moment';
// import { tableParams, tableConvertedParams } from '../types/Global';
// import { AxiosError, AxiosResponse, AxiosResponseHeaders } from 'axios';
// import { addressInterface } from '../types/tables/LocationsParams';

export const getPhoto = (image:string) => {
          let photo = "/img/avatar.png"
          if (image) {
                    if (image.indexOf('base64') !== -1) {
                              photo = image
                    } else {
                              photo = '/img/upload/article/' + image
                    }
          }

          return photo;
}

export const changePhoto =(form,e)=>{
          console.log('changePhoto', '...');
          let file = e.target.files[0];
          let reader = new FileReader();
          let limit = 1024 * 1024 * 2;
          if (file['size'] > limit) {
                    // swal({
                    //           icon: 'error',
                    //           title: 'Ooooops...',
                    //           text: 'You are uploading a large file',
                    // })
                    return false
          }
          reader.onloadend = (file) => {
                    form.image = reader.result
          }

          reader.readAsDataURL(file)
}

// export const getPhoto = (image: string) => {
//   const finalServicesArray: number[] = [];
//   if (!services || !services.length) return finalServicesArray;
//
//   interface service {
//     name: string;
//     id: number;
//   }
//
//   services.forEach((item: service) => {
//     finalServicesArray.push(item.id);
//   });
//   return finalServicesArray;
// };
// export const convertHourFormat = (format: number, hour: string) => {
//   if (format !== 12 && format !== 24) throw 'Invalid time format.';
//   if (!hour) throw 'Invalid hour.';
//   switch (format) {
//     case 12:
//       return moment(hour, 'hh:mm A').format('hh:mm A');
//     case 24:
//       return moment(hour, ['h:mm A']).format('HH:mm');
//   }
// };
// export const statusClass = (status: number) => {
//   return [
//     {
//       'text-600': !status || status > 3,
//       'text-green-600': status === 1,
//       'text-pink-600': status === 2,
//       'text-gray-600': status === 3
//     }
//   ];
// };
// export const normalizeGetTableQuery = (query: tableParams) => {
//   const searchable_columnsSample = query.filters ? Object.keys(query.filters) : [];
//   if (searchable_columnsSample[0] === 'global') searchable_columnsSample.splice(0, 1);
//   const convertedQuery: tableConvertedParams = {
//     searchable_columns: searchable_columnsSample,
//     dt_params: {
//       page: Number(query.page),
//       rows: Number(query.rows),
//       filters: query.filters ? query.filters : {}
//     }
//   };
//   if (query.sortField) convertedQuery.dt_params.sortField = query.sortField;
//   if (query.sortOrder) convertedQuery.dt_params.sortOrder = Number(query.sortOrder);
//   return {
//     dt_params: JSON.stringify(convertedQuery.dt_params),
//     searchable_columns: JSON.stringify(convertedQuery.searchable_columns)
//   };
// };
// export const globalAxiosErrorHandler = (error: AxiosError) => {
//   const ErrorObject = {
//     summary: '',
//     detail: ''
//   };
//   if (!error.response || !error.response.data || !error.response.data.errors) {
//     ErrorObject.summary = 'Error';
//     ErrorObject.detail = 'This is an unexpected error, please notify IT';
//   } else {
//     ErrorObject.summary = 'Error: ' + error.response.data.message;
//     for (const property in error.response.data.errors) {
//       ErrorObject.detail += `${capitalize(property)}: ${error.response.data.errors[property]} \n`;
//     }
//   }
//   return ErrorObject;
// };
// export const capitalize = (word: string) => {
//   const lower = word.toLowerCase();
//   return word.charAt(0).toUpperCase() + lower.slice(1);
// };
// export const generateAddress = (address: addressInterface) => {
//   if (address.street1 && address.street2) {
//     return address.street1 + ', ' + address.street2;
//   } else if (address.street1 && !address.street2) {
//     return address.street1;
//   } else if (!address.street1 && !address.street2) {
//     return '';
//   }
// };
// export const generateFullAddress = (address: addressInterface) => {
//   let finalAddress = '';
//   if (address.street2) finalAddress += address.street2 + ', ';
//   if (address.street1) finalAddress += address.street1 + ', ';
//   if (address.state) finalAddress += address.state + ', ';
//   if (address.country) finalAddress += address.country.iso2;
//   return finalAddress;
// };
// export const convertIsoDateToString = (isoDate: string, format?: string) => {
//   if (!format) format = 'YYYY-MM-DD';
//   return moment(isoDate).format(format);
// };
// export const convertIsoDateToStringFull = (isoDate: string, format?: string) => {
//   if (!format) format = 'YYYY-MM-DD, HH:mm A';
//   return moment(isoDate).format(format);
// };
// export const downloadFileFromRequest = (headers: AxiosResponseHeaders, file: File, format: string) => {
//   switch (format) {
//     case 'csv':
//       format = 'text/csv';
//       break;
//     case 'excel':
//       format = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//       break;
//     default:
//       format = '';
//       break;
//   }
//   if (!format || format === '') throw new Error('Invalid file type');
//   const filename = headers['content-disposition'].split('filename=')[1].split('.')[0];
//   const extension = headers['content-disposition'].split('.')[1].split(';')[0];
//   const url = window.URL.createObjectURL(new Blob([file], { type: format }));
//   const link = document.createElement('a');
//   link.href = url;
//   link.setAttribute('download', filename + extension);
//   document.body.appendChild(link);
//   link.click();
// };
// export const getFileNameFromUrl = (url: string) => {
//   return url.substring(url.lastIndexOf('/') + 1);
// };
// export const isBlob = (response: AxiosResponse) => {
//   const jsonMimeType = 'application/json';
//   const dataType = response.data.type;
//   return response.data instanceof Blob && dataType !== jsonMimeType;
// };

import {ref} from "vue";

export let Form  = {

          type : '',
          link : '',
          title : '',
          tags : [],
          body : '',
          category : '',
          image : ''

}

export  let Customer = {
          name: '',
          mobile: '',
          phone: '',
          address: '',
          password:'',
          services:[],
          userDetail:[{title:'',value:'',isShown:true}]
}

export let Product = {

          title : '',
          media : '',
          short_description : '',
          long_description : '',
          more_media : '',
          category : '',
}

export let BackColor = ref({'background': 'rgb(232,240,255)'})


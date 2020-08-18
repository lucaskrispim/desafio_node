'use strict';

class Validator{ // model de validação de dados
    constructor() {
        this.errors = new Array();
    }
    isRequired(value, message){
        if (!value || value.length <= 0) this.errors.push({ msg: message });
    }

    hasMinLen(value, min, message){
        if (!value || value.length < min) this.errors.push({ msg: message });
    }

    hasMaxLen(value, max, message){
        if (!value || value.length > max) this.errors.push({ msg: message });
    }
    isEmail(value,message){
        let reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if( !String(value).toLowerCase() ) this.errors.push({msg:message});
    }
    jsExiste(value,message){
        if (!value || value.length <= 0) this.errors.push({ msg: message });
    }
    isValid(){
        return this.errors.length == 0 ? true:false;
    }
}


module.exports = ()=>{
    return Validator;
}
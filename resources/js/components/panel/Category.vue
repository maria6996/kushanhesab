<template>

    <v-form
        ref="category"
        v-model="valid"
        lazy-validation
    >
        <v-col
            cols="12"
            md="6"
        >
            <v-text-field
                v-model="category.name"
                :counter="10"
                :rules="nameRules"
                label="Name"
                required
            ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
            <v-text-field
                v-model="category.email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
            <v-select
                v-model="select"
                :hint="`${select.state}, ${select.abbr}`"
                :items="items"
                item-title="state"
                item-value="abbr"
                label="Select"
                persistent-hint
                return-object
                single-line
            ></v-select>
        </v-col>

        <v-checkbox
            v-model="category.checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
        ></v-checkbox>

        <v-btn
            color="success"
            class="mr-4"
            @click="validate"
        >
            Validate
        </v-btn>

        <v-btn
            color="error"
            class="mr-4"
            @click="reset"
        >
            Reset Form
        </v-btn>

        <v-btn
            color="warning"
            @click="resetValidation"
        >
            Reset Validation
        </v-btn>
    </v-form>

</template>

<script setup>

import {reactive, ref} from 'vue'

let select = ref({state: 'Florida', abbr: 'FL'})
// let items = ref([
//     {state: 'Florida', abbr: 'FL'},
//     {state: 'Georgia', abbr: 'GA'},
//     {state: 'Nebraska', abbr: 'NE'},
//     {state: 'California', abbr: 'CA'},
//     {state: 'New York', abbr: 'NY'},
// ],)

let category = ref({

    valid: true,
    name: '',
    nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],

    checkbox: false,
})
//
// const validate =async()=>
// {
//     const {valid} = await this.$refs.form.validate()
//
//     if (valid) alert('Form is valid')
// }
//
// const reset = () => {
//     this.$refs.form.reset()
// };
// const resetValidation = () => {
//     this.$refs.form.resetValidation()
// };
</script>

<style scoped>

</style>

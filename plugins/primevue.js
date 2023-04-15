import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import InputText from 'primevue/inputtext';
import ContextMenu from 'primevue/contextmenu';
import Breadcrumb from 'primevue/breadcrumb';
import TabMenu from 'primevue/tabmenu';
import SelectButton from 'primevue/selectbutton';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true});
    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('DataTable', DataTable);
    nuxtApp.vueApp.component('Column', Column);
    nuxtApp.vueApp.component('ColumnGroup', ColumnGroup);
    nuxtApp.vueApp.component('Row', Row);
    nuxtApp.vueApp.component('PrimeInputText', InputText);
    nuxtApp.vueApp.component('ContextMenu', ContextMenu);
    nuxtApp.vueApp.component('Breadcrumb', Breadcrumb);
    nuxtApp.vueApp.component('TabMenu', TabMenu);
    nuxtApp.vueApp.component('SelectButton', SelectButton);
    //other components that you need
});
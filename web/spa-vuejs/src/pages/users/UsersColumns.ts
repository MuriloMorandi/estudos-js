import type { QTableColumn } from "quasar";

const colunas: QTableColumn[] = [
    {
        name:'name', 
        label: 'Nome',
        align: 'left',
        field: (row) => row.name,
        sortable:true
    },
    {
        name:'email', 
        label: 'E-mail',
        align: 'left',
        field: (row) => row.email,
        sortable:true
    },

]


export default colunas;
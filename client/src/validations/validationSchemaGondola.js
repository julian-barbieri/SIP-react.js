import * as Yup from 'yup';

const validationSchemaGondola = Yup.object().shape({
    codigo: Yup.string().required("Campo obligatorio"),
    categoria: Yup.string().min(3).max(30).required("Campo obligatorio"),
    largo: Yup.number().min(1).required("Campo obligatorio"),
    ancho: Yup.number().min(1).required("Campo obligatorio"),
    ubicacionx: Yup.number().min(1).required("Campo obligatorio"),
    ubicaciony: Yup.number().min(1).required("Campo obligatorio"),
});

export default validationSchemaGondola;
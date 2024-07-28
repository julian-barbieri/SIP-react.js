import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("Campo obligatorio"),
  direccion: Yup.string().min(3).max(30).required("Campo obligatorio"),
  largo: Yup.number().min(1).required("Campo obligatorio"),
  ancho: Yup.number().min(1).required("Campo obligatorio"),
  entradax: Yup.number().min(0).required("Campo obligatorio"),
  entraday: Yup.number().min(0).required("Campo obligatorio"),
  salidax: Yup.number().min(0).required("Campo obligatorio"),
  saliday: Yup.number().min(0).required("Campo obligatorio"),
});

export default validationSchema;

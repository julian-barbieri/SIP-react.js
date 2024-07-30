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
  codigo: Yup.string().required("Campo obligatorio"),
  categoria: Yup.string().min(3).max(15).required("Campo obligatorio"),
  subCategoria: Yup.string().required("Campo obligatorio"),
  ubicacionx: Yup.number().min(1).required("Campo obligatorio"),
  ubicaciony: Yup.number().min(1).required("Campo obligatorio"),
  marca: Yup.string().required("Campo obligatorio"),
  descuento: Yup.number().min(0).required("Campo obligatorio"),
  precioUnidad: Yup.number().min(0.01).required("Campo obligatorio"),
});

export default validationSchema;

import * as Yup from 'yup';

const validationSchemaProducto = Yup.object().shape({
    nombre: Yup.string().required("Campo obligatorio"),
    marca: Yup.string().required("Campo obligatorio"),
    categoria: Yup.string().min(3).max(15).required("Campo obligatorio"),
    subCategoria: Yup.string().required("Campo obligatorio"),
    descuento: Yup.number().min(0).required("Campo obligatorio"),
    precioUnidad: Yup.number().min(0.01).required("Campo obligatorio"),
    GondolaId: Yup.string().required("Debes seleccionar una góndola"),
    ubicExacta: Yup.string().required("Debes seleccionar una ubicación exacta")
});

export default validationSchemaProducto;
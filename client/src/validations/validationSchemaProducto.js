import * as Yup from 'yup';

const validationSchemaProducto = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido'),
    marca: Yup.string().required('La marca es requerida'),
    categoria: Yup.string().required('La categoría es requerida'),
    subCategoria: Yup.string().required('La subcategoría es requerida'),
    precioUnidad: Yup.number().required('El precio es requerido').positive('Debe ser un número positivo'),
    descuento: Yup.number().min(0, 'No puede ser negativo').max(100, 'No puede exceder el 100%'),
    stock: Yup.boolean().required('El stock es requerido'),
    GondolaId: Yup.string().required('Debes seleccionar una góndola'),
    ubicExacta: Yup.string().required('Debes seleccionar una ubicación exacta'),
});

export default validationSchemaProducto;
import * as Yup from 'yup';

const validationSchemaGondola = Yup.object().shape({
    codigo: Yup.string().required("El ID es requerido"),
    categoria: Yup.string().min(3).max(30).required("La categoría es requerida"),
    largo: Yup.number().min(1).required("El largo es requerido").positive('Debe ser un número positivo'),
    ancho: Yup.number().min(1).required("El ancho es requerido").positive('Debe ser un número positivo'),
    ubicacionx: Yup.number().min(1).required("La columna es requerida").positive('Debe ser un número positivo'),
    ubicaciony: Yup.number().min(1).required("La fila es requerida").positive('Debe ser un número positivo'),
});

export default validationSchemaGondola;
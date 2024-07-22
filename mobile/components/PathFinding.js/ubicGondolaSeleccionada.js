export default function ubicGondolaSeleccionada(gondolas, productosSeleccionados) {

  let gondolax = null;
  let gondolay = null;
  if (Array.isArray(gondolas)) {
  gondolas.forEach((gondola) => {
    productosSeleccionados.forEach((producto) => {
      if (gondola.id === producto.GondolaId) {
        switch (producto.ubicExacta) {
          case "derecha":
            gondolax = gondola.ubicacionx + gondola.ancho;
            gondolay = gondola.ubicaciony;
            break;
          case "izquierda":
            gondolax = gondola.ubicacionx - 1;
            gondolay = gondola.ubicaciony + gondola.largo - 1;
            break;
          case "abajo":
            gondolax = gondola.ubicacionx;
            gondolay = gondola.ubicaciony + gondola.largo;
            break;
          case "arriba":
            gondolax = gondola.ubicacionx;
            gondolay = gondola.ubicaciony - 1;
            break;
          default:
            break;
        }
      }
    });
  });} 

  return { gondolax, gondolay };

}

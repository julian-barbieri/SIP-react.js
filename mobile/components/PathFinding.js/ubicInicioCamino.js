export default function ubicInicioCamino(gondolaAnterior, productoAnterior) {
    
    let gondolax = null;
    let gondolay = null;
  switch (productoAnterior.ubicExacta) {
    case "derecha":
      gondolax = gondolaAnterior.ubicacionx + gondolaAnterior.ancho;
      gondolay = gondolaAnterior.ubicaciony;
      break;
    case "izquierda":
      gondolax = gondolaAnterior.ubicacionx - 1;
      gondolay = gondolaAnterior.ubicaciony + gondolaAnterior.largo - 1;
      break;
    case "abajo":
      gondolax = gondolaAnterior.ubicacionx;
      gondolay = gondolaAnterior.ubicaciony + gondolaAnterior.largo;
      break;
    case "arriba":
      gondolax = gondolaAnterior.ubicacionx;
      gondolay = gondolaAnterior.ubicaciony - 1;
      break;
    default:
      break;
}

  return { gondolax, gondolay };
  
}
  
export default function ubicGondolaSeleccionada(gondolas, productosSeleccionados) {
    let gondolax = null;
    let gondolay = null;
    gondolas.map((gondola) => {
      productosSeleccionados.map((producto) => {
        if(gondola.id === producto.GondolaId && producto.ubicExacta === "derecha"){
          gondolax = gondola.ubicacionx+gondola.ancho;
          gondolay = gondola.ubicaciony;
        } else if(gondola.id === producto.GondolaId && producto.ubicExacta === "izquierda") {
          gondolax = gondola.ubicacionx-1;
          gondolay = gondola.ubicaciony+gondola.largo-1;
        } else if(gondola.id === producto.GondolaId && producto.ubicExacta === "abajo") {
          gondolax = gondola.ubicacionx;
          gondolay = gondola.ubicaciony+gondola.largo;
        } else if(gondola.id === producto.GondolaId && producto.ubicExacta === "arriba") {
          gondolax = gondola.ubicacionx;
          gondolay = gondola.ubicaciony-1;
        } 
      })
    });
  
    return { gondolax, gondolay };
}

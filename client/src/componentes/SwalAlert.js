import Swal from 'sweetalert2';

const SwalAlert = (type, title, text, timer = 2500) => {
  Swal.fire({
    position: "top",
    icon: type,
    title: title,
    text: text,
    showConfirmButton: true,
    timer: timer
  });
};

export default SwalAlert;

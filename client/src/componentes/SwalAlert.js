import Swal from 'sweetalert2';

const SwalAlert = (type, title, text, timer = 3000) => {
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

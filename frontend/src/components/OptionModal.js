import Swal from 'sweetalert2';

export const OptionModal = (
  axiosFunction,
  data,
  question,
  successText,
  cancelText
) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: ' me-3 btn btn-danger',
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      text: question,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: 'Item deleted',
          text: successText,
          icon: 'success',
        });
        axiosFunction.mutate(data);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire('Cancelled', cancelText, 'error');
      }
    });
};

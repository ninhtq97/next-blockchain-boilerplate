import Swal from 'sweetalert2';

const SwalMixin = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const ToastSuccess = (msg: string) =>
  SwalMixin.fire({ icon: 'success', title: msg });

const ToastError = (msg: string) =>
  SwalMixin.fire({ icon: 'error', title: msg });

export const Toast = {
  show: SwalMixin,
  success: ToastSuccess,
  error: ToastError,
};

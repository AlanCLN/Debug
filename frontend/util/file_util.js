

export const sendUnshippedOrders = (files) => {
  return $.ajax({
    method: 'POST',
    url: '/api/confirmation_files',
    data: files,
    contentType: false,
    processData: false
  });
}
//    关闭添加时模态框
function closeModal(){
    $('.add_modal').removeClass('tran_scale');
    $('.shadow').hide();
}
//    打开添加的模态框
function showModal(){
    $('.add_modal').addClass('tran_scale');
    $('.shadow').show();
}
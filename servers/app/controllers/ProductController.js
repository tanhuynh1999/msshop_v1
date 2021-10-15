const productModel = require('../models/ProductModel');

class ProductController {
    // *[GET]
    getProduct = (req, res, next) => {
        res.json({
            data: this.checkError(req.query) ? [{
                    _id: '123321',
                    name: 'Áo thun polo tay ngắn thêu hình hoa cúc nhỏ thời trang mùa hè cho nam',
                    image: 'https://cf.shopee.vn/file/34c097b0ff59654bbddad6d3cb5209f1',
                    code: 'AT-100',
                    price: 225000,
                    view: 1,
                    describe: 'Chào mừng bạn đến với cửa hàng của chúng tôi. chúng tôi hy vọng được phục vụ bạn! Cửa hàng quần áo nam nữ chính quần áo trẻ em quần áo nam và nữ giày trẻ em ❤Chúng tôi cập nhật sản phẩm mới của chúng tôi mỗi ngày. Hãy chú ý đến các khuyến mãi và sản phẩm mới nhất của chúng tôi! ❤Lưu ý: tất cả các sản phẩm sẽ được chuyển đi nước ngoài và sẽ mất 1-2 tuần để nhận hàng. Nếu bạn có bất kỳ câu hỏi nào khác, vui lòng trò chuyện với chúng tôi!) Câu trả lời trò chuyện sẽ có sẵn ở mức 7x24. Chúc bạn một ngày tuyệt vời!',
                    content: 'Chào mừng bạn đến với cửa hàng của chúng tôi. chúng tôi hy vọng được phục vụ bạn! Cửa hàng quần áo nam nữ chính quần áo trẻ em quần áo nam và nữ giày trẻ em ❤Chúng tôi cập nhật sản phẩm mới của chúng tôi mỗi ngày. Hãy chú ý đến các khuyến mãi và sản phẩm mới nhất của chúng tôi! ❤Lưu ý: tất cả các sản phẩm sẽ được chuyển đi nước ngoài và sẽ mất 1-2 tuần để nhận hàng. Nếu bạn có bất kỳ câu hỏi nào khác, vui lòng trò chuyện với chúng tôi!) Câu trả lời trò chuyện sẽ có sẵn ở mức 7x24. Chúc bạn một ngày tuyệt vời!',
                    password: '',
                    percentDiscount: 0,
                    follow: false,
                    note: false,
                    bin: false,
                    active: true,
                    dateCreate: '2021-10-07T06:46:52.201+00:00',
                    dateModified: '2021-10-07T06:46:52.201+00:00',
                    userCreate: 'tanhuynh',
                    userModified: 'tanhuynh'
                },
                {
                    _id: '123321',
                    name: 'Áo thun polo tay ngắn thêu hình hoa cúc nhỏ thời trang mùa hè cho nam',
                    image: 'https://cf.shopee.vn/file/34c097b0ff59654bbddad6d3cb5209f1',
                    code: 'AT-100',
                    price: 225000,
                    view: 1,
                    describe: 'Chào mừng bạn đến với cửa hàng của chúng tôi. chúng tôi hy vọng được phục vụ bạn! Cửa hàng quần áo nam nữ chính quần áo trẻ em quần áo nam và nữ giày trẻ em ❤Chúng tôi cập nhật sản phẩm mới của chúng tôi mỗi ngày. Hãy chú ý đến các khuyến mãi và sản phẩm mới nhất của chúng tôi! ❤Lưu ý: tất cả các sản phẩm sẽ được chuyển đi nước ngoài và sẽ mất 1-2 tuần để nhận hàng. Nếu bạn có bất kỳ câu hỏi nào khác, vui lòng trò chuyện với chúng tôi!) Câu trả lời trò chuyện sẽ có sẵn ở mức 7x24. Chúc bạn một ngày tuyệt vời!',
                    content: 'Chào mừng bạn đến với cửa hàng của chúng tôi. chúng tôi hy vọng được phục vụ bạn! Cửa hàng quần áo nam nữ chính quần áo trẻ em quần áo nam và nữ giày trẻ em ❤Chúng tôi cập nhật sản phẩm mới của chúng tôi mỗi ngày. Hãy chú ý đến các khuyến mãi và sản phẩm mới nhất của chúng tôi! ❤Lưu ý: tất cả các sản phẩm sẽ được chuyển đi nước ngoài và sẽ mất 1-2 tuần để nhận hàng. Nếu bạn có bất kỳ câu hỏi nào khác, vui lòng trò chuyện với chúng tôi!) Câu trả lời trò chuyện sẽ có sẵn ở mức 7x24. Chúc bạn một ngày tuyệt vời!',
                    password: '',
                    percentDiscount: 0,
                    follow: false,
                    note: false,
                    bin: false,
                    active: true,
                    dateCreate: '2021-10-07T06:46:52.201+00:00',
                    dateModified: '2021-10-07T06:46:52.201+00:00',
                    userCreate: 'tanhuynh',
                    userModified: 'tanhuynh'
                }
            ] : [],
            success: this.checkError(req.query)
        })
    }

    createProduct = (req, res) => {
        const productNew = new productModel(req.query);
        productNew.image = req.file.filename;
        productNew.save();

        res.json({
            success: true
        })
    }

    // *[POST]

    checkError = (query) => {
        const checkUser = 'tanhuynh';
        if (query.userAPI == checkUser) {
            return true;
        }
        return false;
    }
}

module.exports = new ProductController();
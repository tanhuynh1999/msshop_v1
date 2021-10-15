const app = new Vue({
    el: '#app',
    data: function () {
        return {
            tableData: [],
            listData: {
                listTabMain: [{
                        label: 'Tất cả sản phẩm',
                        name: 'index'
                    },
                    {
                        label: 'Theo dõi',
                        name: 'follow'
                    },
                    {
                        label: 'Chú ý',
                        name: 'note'
                    }, {
                        label: 'Thùng rác',
                        name: 'bin'
                    }
                ],
                listOptional: [{
                        _id: 1,
                        name: 'Ngưng hoạt động'
                    },
                    {
                        _id: 2,
                        name: 'Xoá thùng rác'
                    },
                    {
                        _id: 3,
                        name: 'Theo dõi'
                    },
                    {
                        _id: 4,
                        name: 'Bật hoạt động'
                    }
                ],
                listCategory: [{
                        _id: 1,
                        name: 'Áo'
                    },
                    {
                        _id: 2,
                        name: 'Quần'
                    }
                ]
            },
            productForm: {
                name: '',
                image: '',
                code: '',
                price: 0,
                view: 1,
                describe: '',
                content: '',
                percentDiscount: 0,
                active: true,
                category: []
            },
            productValidate: {
                name: [{
                    required: true,
                    message: 'Vui lòng nhập tên sản phẩm',
                    trigger: 'change'
                }, {
                    max: 200,
                    message: 'Nhập quá ký tự cho phép',
                    trigger: 'change'
                }],
                code: [{
                    max: 50,
                    message: 'Nhập quá ký tự cho phép',
                    trigger: 'change'
                }],
                price: [{
                        max: 200,
                        message: 'Nhập quá ký tự cho phép',
                        trigger: 'change'
                    },
                    {
                        pattern: /[0-9]/,
                        message: 'Số tiền phải là con số',
                        trigger: 'change'
                    }
                ],
                percentDiscount: [{
                        max: 4,
                        message: 'Nhập quá ký tự cho phép',
                        trigger: 'change'
                    },
                    {
                        pattern: /^[1-9]$|^[1-9][0-9]$|^(100)$/,
                        message: 'Phần trăm giảm giá từ 0 - 100%',
                        trigger: 'change'
                    }
                ],
                describe: [{
                    max: 500,
                    message: 'Nhập quá ký tự cho phép',
                    trigger: 'change'
                }]
            },
            multipleSelection: [],
            api: {
                linkAPI: 'http://localhost:5000/',
                userAPI: 'tanhuynh',
                keyAPI: 'tanhuynh_10142021_0143',
                ip: '172.480.1.2'
            },
            showTable: {
                showCategory: true
            },
            searchForm: {
                dateStart: '',
                dateEnd: '',
                priceStart: '',
                priceEnd: ''
            },
            searchValidate: {

            },
            title: 'Quản lý sản phẩm',
            titleDialog: '',
            tabMain: 'index',
            searchProduct: '',
            valueOptional: '',
            listItem: [],
            labelPositionTop: 'top',
            dialogFormProduct: false,
            showImg: 'images/common/noimg.png',
            isRemoteImage: false,
            isCreateCategory: false
        }
    },
    mounted() {
        this.loadProduct();
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.listItem = val;
        },
        loadProduct() {
            let vm = this;
            const link = vm.api.linkAPI + '/get-product';
            axios.get(link, {
                    params: JSON.parse(JSON.stringify(vm.api))
                })
                .then(function (response) {
                    // handle success
                    if (response.data.success) {
                        if (response.status == 200) {
                            vm.tableData = response.data.data;
                        } else {
                            vm.$message({
                                message: 'Gián đoạn vui lòng tải lại!',
                                type: 'warning'
                            });
                        }
                    } else {
                        vm.$message({
                            message: 'Gián đoạn vui lòng tải lại.',
                            type: 'warning'
                        });
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        },
        clickCreateProduct() {
            let vm = this;
            vm.dialogFormProduct = true;
            vm.titleDialog = 'Thêm sản phẩm mới';
        },
        //function to
        searchByProduct(searchForm) {
            let vm = this;
            console.log(vm.searchForm);
        },
        createOptional() {
            let vm = this;
            if (vm.listItem.length > 0) {
                if (vm.valueOptional != '') {
                    console.log(vm.listItem);
                    console.log(vm.valueOptional);
                } else {
                    vm.$message({
                        message: 'Vui lòng chọn thao tác.',
                        type: 'warning'
                    });
                }
            } else {
                vm.$message({
                    message: 'Vui lòng chọn ít nhất 1 dữ liệu.',
                    type: 'warning'
                });
            }
        },
        createProduct(productForm) {
            let vm = this;
            vm.$refs[productForm].validate((valid) => {
                if (valid) {
                    const link = vm.api.linkAPI + 'product/create';

                    const formData = new FormData();
                    formData.append('fileIMG', vm.productForm.image);

                    axios.post(link, formData, {
                            params: JSON.parse(JSON.stringify(vm.productForm))
                        })
                        .then(function (response) {
                            // handle success
                            if (response.data.success) {
                                if (response.status === 200) {
                                    this.$notify({
                                        title: 'Success',
                                        message: 'Thêm sản phẩm [' + vm.productForm.name + '] thành công',
                                        type: 'success'
                                    });
                                    vm.dialogFormProduct = false;
                                    vm.$refs[productForm].resetFields();
                                    vm.remoteImage(vm.productForm);
                                    vm.loadProduct();
                                }
                            }
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        uploadImg(productForm) {
            let vm = this;
            const file = document.querySelector('input[type=file]').files[0];
            console.log(file);
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                // convert image file to base64 string
                vm.showImg = reader.result;
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }

            vm.isRemoteImage = true;
            vm.productForm.image = file;
        },
        remoteImage(productForm) {
            let vm = this;
            vm.showImg = 'images/common/noimg.png';
            vm.isRemoteImage = false;
            vm.productForm.image = null;
        },
        handleClickMain(tab, event) {
            console.log(tab.name);
        },
        priceFormat(price) {
            return this.formatPrice(price);
        },
        priceSumFormat(price, percentDiscount) {
            const format = price * (100 - percentDiscount) / 100;
            return this.formatPrice(format);
        },
        sumPrice(productForm) {
            let vm = this;
            const format = vm.productForm.price * (100 - vm.productForm.percentDiscount) / 100;
            return vm.formatPrice(format);
        },
        formatPrice(price) {
            return price.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND'
            });
        },
        dateCreateFormat(date) {
            return this.formatDate(date);
        },
        dateModifiedFormat(date) {
            return this.formatDate(date);
        },
        formatDate(date) {
            const dateNew = new Date(date);
            return dateNew.toLocaleString();
        }
    }
})
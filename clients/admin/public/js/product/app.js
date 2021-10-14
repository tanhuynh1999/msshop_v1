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
                ]
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
            tabMain: 'index',
            searchProduct: '',
            valueOptional: '',
            listItem: [],
            labelPositionTop: 'top'
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
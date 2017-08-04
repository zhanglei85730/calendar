var calendar = (function($) {
    const dayNames = new Array("日", "一", "二", "三", "四", "五", "六");
    //日期对象,月份第一天，月份从0开始，7月为06
    var date = new Date(),
        date_firstDate,
        //日期对象,从月份最后一天 xxxx/xx/0返回xx-1月最后一天
        date_maxDate,
        currDate = date.getDate(),
        currMonth = date.getMonth(),
        currYear = date.getFullYear(),
        $calendarContainer = $('#calendar'),
        //自增monthAdd
        //monthAdd,
        //设置
        i = 0,
        _option = {
            tableClass: 'ui-calendar-table',
            calendarContainer: '#calendar',
            minDate: false,
            maxDate: false,
            dateData: false,
        };
    //月份改变当月绑定数据

    //返回2位月份数 1月为01，10为10
    function formatMonth(month) {
        return month + 1 < 10 ? '0' + (month + 1) : month + 1;
    };
    //返回年份
    function formatYear(year) {
        return year
    };
    //用于参数合并,如果option有设置，合并到_option
    function merageJson(a, b) {
        for (x in a) {
            for (i in b) {
                if (x == i) {
                    b[i] = a[x];
                }
            }
        }
        return b
    };
    //公有方法
    var calendar = {
        //获取年份
        setCurrYear: function(year) {
            date.setFullYear(year);
        },
        //设置月份
        setCurrMonth: function(month) {
            //Date类会自动根据月份更新年
            date.setMonth(month)
        },
        //设置日期
        setCurrDate: function(date) {
            date.setDate(date);
        },
        //获取年份
        getCurrYear: function() {
            return date.getFullYear();
        },
        //获取月份
        getCurrMonth: function() {
            return date.getMonth();
        },
        //获取日期
        getCurrDate: function() {
            return date.getDate();
        },
        getSelectDate: function() {
            var activeObj = $("." + _option.tableClass).find('.calendar-active').parent();
            return activeObj.attr('data-year') + '-' + formatMonth(parseInt(activeObj.attr('data-month')) - 1) + '-' + formatMonth(parseInt(activeObj.attr('data-date')) - 1)
        },
        option: function(obj) {
            obj.forEach
        },
        init: function() {
            //设置当前月份
            this.setCurrMonth(this.getCurrMonth())
            date_firstDate = new Date(this.getCurrYear(), this.getCurrMonth(), 01);
            // xxxx/xx/0返回xx-1月最后一天
            date_maxDate = new Date(this.getCurrYear(), this.getCurrMonth() + 1, 0);
            //console.log(date_maxDate);
        },
        //渲染标题
        renderTitle: function(year, month) {
            return '<div class="ui-calendar-title">\n' +
                '<div class="ui-calendar-prev"></div>' +
                '<div class="ui-calendar-title-date">' +
                '<span class="ui-calendar-year">' + year + '</span>\n' +
                '<span class="ui-calendar-month">' + month + '</span>\n' +
                '</div>\n' +
                '<diva class="ui-calendar-next"></div>\n' +
                '</div>';
        },
        //渲染星期
        renderHeader: function(dayNames) {
            var header = '<thead><tr>\n';
            for (var i = 1; i <= dayNames.length; i++) {
                if (i + 1 > dayNames.length) {
                    header += '<th><span>' + dayNames[0] + '</span></th>\n';
                } else {
                    header += '<th><span>' + dayNames[i] + '</span></th>\n'
                };
            };
            header += '</tr></thead>';
            return header
        },
        //渲染日期
        renderBody: function(date_firstDate, date_maxDate, dateData) {
            var dd = dateData;
            var body = '<tbody>\n',
                //count计算器
                count = 0,
                //加载时的当前日期
                currentDate = new Date().getDate(),
                _this = this,
                //date为一月中的全部日期
                date = 1
            dateDataIndex = 0;

            function markCurrentDate(date, currentDate, dateStr) {
                //日期范围
                var thisDate = new Date(_this.getCurrYear(), _this.getCurrMonth(), date),
                    minDate,
                    maxDate,
                    _date = new Date(),
                    _dateMonth = _date.getMonth(),
                    _currentMonth = _this.getCurrMonth();
                var dates = dateStr;
                if (_option.minDate && _option.maxDate) {
                    minDate = _option.minDate,
                        maxDate = _option.maxDate;
                    //当前日期在最小日期与最大日期之间                    
                    if (thisDate > minDate && thisDate < maxDate) {
                        dateDataIndex++
                        //console.log(_option.dateData[dateDataIndex - 1])                      
                        var flag = false,
                            dateBingData;
                        for (var x = 0; x < _option.dateData.length; x++) {
                            if (dateStr == _option.dateData[x].date) {
                                dateBingData = _option.dateData[x].data
                                flag = true;
                                break;
                            }
                        };
                        if (date == currentDate && _dateMonth == _currentMonth) {
                            // return '<span class="calendar-date-num calendar-active">' + date - 1 + '</span>' + '<span class="calendar-date-mark">' + dateBingData + '</span>\n';
                            if (!dateBingData) {
                                return '<span class="calendar-date-num calendar-active">' + date + '</span>\n';
                            } else {
                                return '<span class="calendar-date-num calendar-active">' + date + '</span>' + '<span class="calendar-date-mark">' + dateBingData + '</span>\n';
                            }


                        } else {

                            if (flag) {

                                return '<span class="calendar-date-num"> ' + date + '</span>' + '<span class="calendar-date-mark">' + dateBingData + '</span>\n';
                            } else {
                                return '<span class="calendar-date-num"> ' + date + '</span></span>\n';
                            };
                        };
                    } else {
                        return '<span class="calendar-date-num calendar-unable"> ' + date + '</span>';
                        // if (date == currentDate) {
                        //     return '<span class="calendar-date-num calendar-active">' + date + '</span>\n';
                        // } else {
                        //     //如果存在minDate和maxDate minDate与maxDate之外的不可选择
                        //     return '<span class="calendar-date-num calendar-unable"> ' + date + '</span>';
                        // };
                    };
                } else {
                    if (date == currentDate && _date.getMonth() == this.getCurrMonth) {
                        return '<span class="calendar-date-num calendar-active">' + date + '</span>';
                    } else {
                        return '<span class="calendar-date-num"> ' + date + '</span>';
                    };
                };

            };
            //日期绑定数据索引值，数据类型为数据组           
            for (var i = 0; i < 6; i++) {
                body += '<tr>\n'
                    //月份第一天 从对应星期开始
                for (var n = 0; n < 7; n++) {
                    count++;
                    if (count >= date_firstDate.getDay()) {
                        if (date <= date_maxDate.getDate()) {
                            body += '<td data-year=' + '"' + this.getCurrYear() + '"' +
                                'data-month=' + '"' + (this.getCurrMonth() + 1) + '"' +
                                'data-date=' + '"' + date + '"' +
                                ' >' + markCurrentDate(date++, currentDate, this.getCurrYear() + '-' + formatMonth(this.getCurrMonth()) + '-' + formatMonth(date - 2)) + '</td>\n';
                        } else {
                            body += '<td>' + "&nbsp;" + '</td>\n';
                        }

                    } else {
                        body += '<td>' + "&nbsp;" + '</td>\n';
                    };
                };

                body += '</tr>\n';
            };
            body += '</tbody>'
            return body;
        },
        renderMain: function() {
            this.init();
            var renderMain = '<table class=' + _option.tableClass + '>\n ' + this.renderHeader(dayNames) + this.renderBody(date_firstDate, date_maxDate) + '</table>\n';
            $('.calendar-main').html(renderMain);
            $('.ui-calendar-title-date').html('<span class="ui-calendar-year">' + formatYear(this.getCurrYear()) + '年' + '</span>\n' + '<span class="ui-calendar-month">' + formatMonth(this.getCurrMonth()) + '月' + '</span>')
        },
        //渲染整个calendar组件
        renderCalendar: function(opt) {

            _option = opt ? merageJson(opt, _option) : _option;
            this.init();
            var month = this.getCurrMonth() < 10 ? '0' + this.getCurrMonth() : this.getCurrMonth();
            var html = this.renderTitle(formatYear(this.getCurrYear()) + '年', formatMonth(this.getCurrMonth()) + '月') + '<div class="calendar-main">\n' + '<table class=' + _option.tableClass + '>\n ' + this.renderHeader(dayNames) + this.renderBody(date_firstDate, date_maxDate) + '</table>\n' + '</div>\n';
            $(_option.calendarContainer).html(html);
            //下一月按钮
        },
        destory: function() {
            $(_option.calendarContainer).html('');
        },
        //事件处理
        eventHandle: function(cb, changeMonthEvent) {
            var _this = this;
            //$calendar = $(_option.$calendarContainer)

            function nextMonth() {

                var monthAdd = _this.getCurrMonth();
                //有设置日期区间

                if (_option.minDate && _option.maxDate) {
                    if (date.getTime() < _option.maxDate.getTime()) {
                        calendar.setCurrMonth(monthAdd + 1)
                        changeMonthEvent(_this.getCurrYear(), _this.getCurrMonth());
                        calendar.renderMain();
                    };

                } else {
                    calendar.setCurrMonth(monthAdd + 1)
                    calendar.renderMain();
                };
            };

            function prevMonth() {
                var monthMinus = _this.getCurrMonth();
                if (_option.minDate && _option.maxDate) {
                    if (date.getTime() > _option.minDate.getTime()) {
                        calendar.setCurrMonth(monthMinus - 1)
                        changeMonthEvent(_this.getCurrYear(), _this.getCurrMonth());
                        calendar.renderMain();
                    }
                } else {
                    calendar.setCurrMonth(monthMinus - 1)
                    calendar.renderMain();
                };
            }
            $('.ui-calendar-next').on('click ', function() {
                nextMonth();
            });
            //上一月按钮
            $('.ui-calendar-prev').on('click', function() {
                prevMonth()

            });
            $(_option.calendarContainer).on('click ', '.calendar-date-num', function() {
                //没有calendar-unable方可点击
                if (!$(this).hasClass('calendar-unable')) {
                    $(_option.calendarContainer).find('.calendar-active').removeClass('calendar-active');
                    $(this).addClass('calendar-active');
                    //回调
                    cb(_this.getSelectDate());
                }

            });
            $(_option.calendarContainer).on('swipeLeft', '.calendar-main', function() {
                nextMonth()
            });
            $(_option.calendarContainer).on('swipeRight', '.calendar-main', function() {
                prevMonth()
            })

        },
        monthData: function(monthData) {
            console.log('f')
            _option.dateData = monthData

        }
    };
    return calendar;
    //依赖Zepto或jQuery
})(window.Zepto || window.jQuery)
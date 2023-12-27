var formEl = document.querySelector("main div.container form");
    var warrantyId = window._cdpEventFunction.md5(new Date().toString());
    var dealer;
    var euCompanyName;
    var purchaseDate;
    var workpiece;
    var warrantyMessage;
    var hardmaticCodeNo;
    var hardmaticSerialNo;
    var surftestCodeNo;
    var surftestSerialNo;
    var toolmakerCodeNo;
    var toolmakerSerialNo;
    var customerId;
    var customerName;

    // We will have 2 kinds of source: website event and GCS which to help us distinguish which source that the BO is coming from.
    // This attribute is the solution for the duplication of enquiry data in CDP above.
    var source = "website event";

    var dealerEl = formEl.querySelector("input[name='dealer']");
    if (dealerEl) {
        dealer = dealerEl.value.trim();
    }

    var euCompanyNameEl = formEl.querySelector("input[name='endUserCompanyName']");
    if (euCompanyNameEl) {
        euCompanyName = euCompanyNameEl.value.trim();
    }

    var purchaseDateLabelEl = formEl.querySelector("label[for='purchase_date']");
    if (purchaseDateLabelEl && purchaseDateLabelEl.nextSibling) {
        var purchaseDateEl = purchaseDateLabelEl.nextSibling.querySelector("input");
        if (purchaseDateEl) {
            // We need to format date time here since in CDP event, we accept the datetime format is YYYY-MM-DD [HH:mm:ss]
            var textValue = purchaseDateEl.value;
            if (textValue) {
                var dateValue = new Date(textValue);
                purchaseDate = dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-' + dateValue.getDate();
            }                                                    
        }
    }

    var workpieceEl = formEl.querySelector("textarea[name='workpiece']");
    if (workpieceEl) {
        workpiece = workpieceEl.value.trim();
    }

    var messageEl = formEl.querySelector("textarea[name='comments']");
    if (messageEl) {
        warrantyMessage = messageEl.value.trim();
    }

    var hardmaticBoxEl = formEl.querySelector("input[name='hardmatic_box']");
    if (hardmaticBoxEl && hardmaticBoxEl.checked) {
        var hardmaticCodeNoLabelEl = formEl.querySelector("label[for='code_number1']");
        if (hardmaticCodeNoLabelEl && hardmaticCodeNoLabelEl.nextSibling) {
            var hardmaticCodeNoEl = hardmaticCodeNoLabelEl.nextSibling;
            if (hardmaticCodeNoEl) {
                hardmaticCodeNo = hardmaticCodeNoEl.innerText;
            }
        }

        var hardmaticSerialNoEl = formEl.querySelector("input[name='serial_number1']");
        if (hardmaticSerialNoEl) {
            hardmaticSerialNo = hardmaticSerialNoEl.value.trim();
        }
    }

    var surftestBoxEl = formEl.querySelector("input[name='surftest_box']");
    if (surftestBoxEl && surftestBoxEl.checked) {
        var surftestCodeNoLabelEl = formEl.querySelector("label[for='code_number2']");
        if (surftestCodeNoLabelEl && surftestCodeNoLabelEl.nextSibling) {
            var surftestCodeNoEl = surftestCodeNoLabelEl.nextSibling;
            if (surftestCodeNoEl) {
                surftestCodeNo = surftestCodeNoEl.innerText;
            }
        }

        var surftestSerialNoEl = formEl.querySelector("input[name='serial_number2']");
        if (surftestSerialNoEl) {
            surftestSerialNo = surftestSerialNoEl.value.trim();
        }
    }

    var toolmakerBoxEl = formEl.querySelector("input[name='toolmaker_box']");
    if (toolmakerBoxEl && toolmakerBoxEl.checked) {
        var toolmakerCodeNoLabelEl = formEl.querySelector("label[for='code_number3']");
        if (toolmakerCodeNoLabelEl && toolmakerCodeNoLabelEl.nextSibling) {
            var toolmakerCodeNoEl = toolmakerCodeNoLabelEl.nextSibling;
            if (toolmakerCodeNoEl) {
                toolmakerCodeNo = toolmakerCodeNoEl.innerText;
            }
        }

        var toolmakerSerialNoEl = formEl.querySelector("input[for='serial_number3']");
        if (toolmakerSerialNoEl) {
            toolmakerSerialNo = toolmakerSerialNoEl.value.trim();
        }
    }

    var userName = localStorage.getItem("userName");
    if (userName) {
        customerName = userName;
    }

    var userId = localStorage.getItem("userId");
    if (userId) {
        customerId = userId;
    }

    // After extracting data, we now build the event props, the object attributes and event attributes below is get retrieved
    // when designing event.
    var props = {
        extra: {
            identify_time: window._cdpEventFunction._cdpGetLeadTime(),
            identify_event: "extend_warranty"
        },
        items: [],
        dims: {
            dax_extended_warranty: {
                id: warrantyId,
                name: warrantyId, // We need id and name to be presented so that CDP can received the data
                received_on: window._cdpEventFunction._cdpGetLeadTime(),
                message: warrantyMessage,
                customer_id: customerId,
                customer_name: customerName,
                dealer: dealer,
                purchase_date2: purchaseDate,
                workpiece: workpiece,
                surftest_sj_code_number: surftestCodeNo,
                surftest_sj_serial_number: surftestSerialNo,
                hardmatic_code_number: hardmaticCodeNo,
                hardmatic_serial_number: hardmaticSerialNo,
                toolmaker_code_number: toolmakerCodeNo,
                toolmaker_serial_number: toolmakerSerialNo,
                end_user_company_name: euCompanyName,
                source: source
            },
            customers: {
                customer_id: customerId,
                name: customerName
            }                                                   
        }
    };

    // Send the event data to CDP365.
    web_event.track("warranty", "extend", props);
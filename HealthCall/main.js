// form validation
function validateRegister() {
    const nameReg = /[\u0041-\u005A\u0061-\u007A\u0621-\u064A ]{3,}/
    const emailReq = /\S+@\S+\.\S+/
    const phoneReq = /[\+]\d{3}[\-]\d{9}/

	var username, contactInput, contactType;

    username = $('#name-input').val();
    selectVal = $('.custom-option.selected').data('value');
    contactInput = $('[id$=contact-input]').val()
    contactType = $('#contact-input').get(0).type
	if (username == null || username == '' || username ==undefined) {
	    $('#regisErr').addClass('error').text('Name is required');
	    $('#name').focus();
	    return false;
    }
    else if (!nameReg.test(username)) {
        $('#regisErr').addClass('error').text('Please enter a valid name');
	    $('#name').focus();
	    return false;
    }
    else if (selectVal == null || selectVal == '' || selectVal == undefined) {
        $('#regisErr').addClass('error').text('Please choose a contact method');
	    $('.custom-select__trigger').focus();
	    return false;
    }
    else if (contactInput == null || contactInput == '' || contactInput ==undefined) {
        $('#regisErr').addClass('error').text('Please fill in the information');
	    $('.custom-select__trigger').focus();
	    return false;
    }
    else if (contactType == "email" && !emailReq.test(contactInput)) {
        $('#regisErr').addClass('error').text('Please enter a valid email');
	    $('.custom-select__trigger').focus();
	    return false;
    }
    else if (contactType == "tel" && !phoneReq.test(contactInput)) {
        $('#regisErr').addClass('error').text('Please enter a valid phone number');
	    $('.custom-select__trigger').focus();
	    return false;
    }
    else {
        $('.errorBlock').hide()
    }	
}

$(function () {
    $(".section_1_button").click(function () {
        $(".model").show();
        
    })
    $(".booking-botton").click(function () {
        $(".model").show();
    })
    $(".booking-botton-mobile").click(function () {
        $(".model").show();
    })
    $(".booking-botton3").click(function () {
        $(".model").show();
    })
    $(".booking-botton-mobile").click(function () {
        $(".model").show();
        
    })
    $(".booking-botton2").click(function () {
        $(".model").show();
    })
    $(".booking-botton-mobile1").click(function () {
        $(".model").show();
    })

    


    $(".close").click(function () {
        $(".model").hide();
        $('.thankyouPage').hide();
        $('#form').show();
        $(".contact-input-div").hide();
        $('#form')[0].reset();
        $('.custom-option').parent().find('.selected').removeClass('selected')
        $('.custom-option').eq(0).addClass('selected');
        $('.custom-select .custom-select__trigger span').text('طريقة التواصل ...') 
    })
    $('#form').submit(async function (e) {
        e.preventDefault();
        const nameValue = $("#name-input").val();
        const selected = $('.custom-option.selected').data('value');
        const contactInputValue = $('[id$=contact-input]').val()
        let object = {
            name: nameValue,
            contactMethod: `${selected} ${contactInputValue} - Clinic : 4D Dental Center`,
        };
        let response = await fetch(
            "https://gwhb7l31r0.execute-api.eu-central-1.amazonaws.com/default/clinicsMailerFunction",
            {
                method: "POST",
                body: JSON.stringify(object),
            }
        );
        if (response.status == 200) {
            $('#form').hide();
            fbq("track", "Lead");
            $(".thankyouPage").show();
            $('#form')[0].reset();
        }
        // $('#form').hide();
        // $(".thankyouPage").show();
        // $('#form')[0].reset();
        // console.log($('#contact-input').get(0).type)
    })

    //select value check line 118
    var val;

    document.querySelector('.custom-select-wrapper').addEventListener('click', function() {
        this.querySelector('.custom-select').classList.toggle('open');
        if (val == 'email') {
            $(".contact-input-div").show()
            // $('[id$=contact-label]').text("البريد الاكتروني");
            $("#defult").remove(); 
            $('[id$=contact-input]').attr("placeholder", "Email address");
            $('[id$=contact-input]').css('direction', 'rtl');
            $('[id$=contact-input]').css('text-align', 'start');
            $('[id$=contact-input]').val('');
            $('#contact-input').get(0).type = "email"
        }
        else if (val == 'whats/app') {
            $(".contact-input-div").show()
            // $('[id$=contact-label]').text("واتس اب");
            $("#defult").remove(); 
            $('[id$=contact-input]').attr("placeholder", "+962-xxxxxxxxxx");
            $('#contact-input').get(0).type = "tel"
            $('[id$=contact-input]').val('');
            $('[id$=contact-input]').css('direction', 'ltr');
            $('[id$=contact-input]').css('text-align', 'end');
        }
        else if (val == 'phone') {
            $(".contact-input-div").show()
            // $('[id$=contact-label]').text("رقم الهاتف");
            $("#defult").remove(); 
            $('[id$=contact-input]').attr("placeholder", "+962-xxxxxxxxxx");
            $('[id$=contact-input]').css('direction', 'ltr');
            $('[id$=contact-input]').css('text-align', 'end');
            $('#contact-input').get(0).type = "tel"
            $('[id$=contact-input]').val('');
        }
    })
    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
                this.closest('.custom-select').querySelector('.custom-select__trigger').style.opacity = "1";
                val = $('.custom-option.selected').data('value')
            }
        })
    }
    $(window).click(function(e) {if (e.target == $(".model")[0]) {
        $(".model").hide();
        $('#form')[0].reset();
        $(".contact-input-div").hide()
        $('[id$=contact-input]').val(''); 
        $('.custom-option').parent().find('.selected').removeClass('selected')
        $('.custom-option').eq(0).addClass('selected');
        $('.custom-select .custom-select__trigger span').text(' Way to communicate')   
    }})
});
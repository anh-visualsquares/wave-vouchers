$(function() {
  const GIFT_VARIANT = 'send as a gift';
  const productVariantSelectInitialize = () => {
    const $productVariantSelect = $('.js-single-option-selector');
    const $giftVoucherRecipient = $('.js-gift-voucher__recipient');

    if ($productVariantSelect.val().toLowerCase() === GIFT_VARIANT) {
      $giftVoucherRecipient.show();
      $giftVoucherRecipient.find('.js-voucher-input').removeClass('hidden');
      $('[data-hidden-send-gift]').hide();
    }
  };

  const productVariantSelectHandler = () => {
    const $productVariantSelect = $('.js-single-option-selector');
    const $giftVoucherRecipient = $('.js-gift-voucher__recipient');

    $productVariantSelect.on('change', function() {
      const $this = $(this);
      const valueInLowerCase = $this.val().toLowerCase();

      if (valueInLowerCase === GIFT_VARIANT) {
        $giftVoucherRecipient.show();
        $giftVoucherRecipient.find('.js-voucher-input').removeClass('hidden');
        $('[data-hidden-send-gift]').hide();
      } else {
        $giftVoucherRecipient.hide();
        $giftVoucherRecipient.find('.js-voucher-input').addClass('hidden');
        $('[data-hidden-send-gift]').show();
      }
    });
  };

  const directCheckoutHandler = () => {
    $('.js-direct-checkout__button').on('click', function(e) {
      const $giftVoucherRecipient = $('.js-gift-voucher__recipient');
      const $recipientEmailAddress = $giftVoucherRecipient.find('[name="properties[recipient_email]"]');
      const $senderName = $giftVoucherRecipient.find('[name="properties[sender_name]"]');
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if ($recipientEmailAddress.val().trim().length <= 0) {
        $recipientEmailAddress.addClass('error');
        if ($recipientEmailAddress.next('.error-message').length <= 0) {
          $recipientEmailAddress.after('<span class="error-message">Please enter a recipient email address</span>');
        }
        $recipientEmailAddress.focus();

        return
      }

      if (emailRegex.test($recipientEmailAddress.val()) === false) {
        $recipientEmailAddress.addClass('error');
        if ($recipientEmailAddress.next('.error-message').length <= 0) {
          $recipientEmailAddress.after('<span class="error-message">Email address is invalid</span>');
        }
        $recipientEmailAddress.focus();

        return
      }

      if ($senderName.val().trim().length <= 0) {
        $senderName.addClass('error');
        if ($senderName.next('.error-message').length <= 0) {
          $senderName.after('<span class="error-message">Please enter a sender name</span>');
        }
        $senderName.focus();

        return
      }

      $('[data-shopify="payment-button"] .shopify-payment-button__button').trigger('click');
    })
  }

  const clearValidateMessagesHandler = () => {
    const $giftVoucherRecipient = $('.js-gift-voucher__recipient');
    const $recipientEmailAddress = $giftVoucherRecipient.find('[name="properties[recipient_email]"]');
    const $senderName = $giftVoucherRecipient.find('[name="properties[sender_name]"]');

    $recipientEmailAddress.on('keydown', function() {
      $(this).removeClass('error');
      $(this).next('.error-message').remove();
    });

    $senderName.on('keydown', function() {
      $(this).removeClass('error');
      $(this).next('.error-message').remove();
    });
  };

  directCheckoutHandler();
  clearValidateMessagesHandler();
  productVariantSelectInitialize();
  productVariantSelectHandler();
})

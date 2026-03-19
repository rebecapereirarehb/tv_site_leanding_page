// Formulário
const form = document.getElementById('leadForm');
const message = document.getElementById('formMessage');

// Validação de telefone
function validatePhone(phone) {
  const phoneRegex = /^[\(\)\-\s\d]{10,15}$/;
  return phoneRegex.test(phone);
}

// Validação de email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Formatação automática de telefone
document.getElementById('telefone')?.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 0) {
    if (value.length <= 2) {
      value = `(${value}`;
    } else if (value.length <= 7) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    }
  }
  e.target.value = value;
});

// Formatação de CEP
document.getElementById('cep')?.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 5) {
    value = `${value.slice(0, 5)}-${value.slice(5, 8)}`;
  }
  e.target.value = value;
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();

  message.classList.remove('error', 'success');

  if (!nome || nome.length < 3) {
    message.textContent = '❌ Nome inválido (mínimo 3 caracteres)';
    message.classList.add('error');
    return;
  }

  if (!validateEmail(email)) {
    message.textContent = '❌ E-mail inválido';
    message.classList.add('error');
    return;
  }

  if (!validatePhone(telefone)) {
    message.textContent = '❌ Telefone inválido';
    message.classList.add('error');
    return;
  }

  message.textContent = `✅ Obrigado, ${nome}! Sua oferta foi enviada para ${telefone}`;
  message.classList.add('success');
  form.reset();
});

// FAQ Accordion
const faqHeaders = document.querySelectorAll('.faq-header');

faqHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const faqId = header.getAttribute('data-faq');
    const faqContent = document.getElementById(`faq-${faqId}`);

    // Fechar outras FAQs abertas
    document.querySelectorAll('.faq-content').forEach(content => {
      if (content.id !== `faq-${faqId}`) {
        content.classList.remove('open');
        content.previousElementSibling.classList.remove('active');
      }
    });

    // Toggle FAQ atual
    faqContent.classList.toggle('open');
    header.classList.toggle('active');
  });
});
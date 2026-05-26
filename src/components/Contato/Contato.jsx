import { useState, useCallback } from 'react';
import './Contato.css';

const contactDetails = [
  {
    icon: 'fab fa-whatsapp',
    title: 'WhatsApp',
    content: '(41) 99755-2818',
    href: 'https://wa.me/5541997552818',
    ariaLabel: 'Fale conosco pelo WhatsApp',
  },
  {
    icon: 'fab fa-instagram',
    title: 'Instagram',
    content: '@neumann_web_solutions',
    href: 'https://www.instagram.com/neumann_web_solutions/',
    ariaLabel: 'Siga-nos no Instagram',
  },
  {
    icon: 'fas fa-envelope',
    title: 'E-mail',
    content: 'neumannwebsolutions@gmail.com',
    href: 'mailto:neumannwebsolutions@gmail.com',
    ariaLabel: 'Envie um e-mail',
  },
  {
    icon: 'fas fa-clock',
    title: 'Horário',
    content: 'Segunda a Sexta: 9h às 18h',
  },
];

export default function Contato() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const validateForm = () => {
    if (!form.nome.trim()) return 'Nome é obrigatório.';
    if (!form.email.trim()) return 'E-mail é obrigatório.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return 'E-mail inválido.';
    if (!form.mensagem.trim()) return 'Mensagem é obrigatória.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    // Construção da mensagem para WhatsApp
    let texto = `Olá! Gostaria de solicitar um orçamento.%0A%0A`;
    texto += `*Nome:* ${form.nome}%0A`;
    texto += `*E-mail:* ${form.email}%0A`;
    if (form.telefone) texto += `*Telefone:* ${form.telefone}%0A`;
    texto += `*Mensagem:* ${form.mensagem}%0A%0A`;
    texto += `Aguardo seu retorno!`;

    const url = `https://wa.me/5541997552818?text=${texto}`;

    // Pequeno delay para UX (opcional, mas mantido para feedback visual)
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setForm({ nome: '', email: '', telefone: '', mensagem: '' });
      setTouched({});
      setLoading(false);
    }, 800);
  };

  const isInvalid = (field) => touched[field] && !form[field]?.trim();

  return (
    <section id="contato" className="contato-section section-padding">
      <div className="container contact-container">
        {/* Card principal com formulário */}
        <div className="contact-card-cta reveal-fade-up">
          <h2 className="contact-title">
            Pronto para a sua{' '}
            <span className="text-neon-gradient">Próxima Evolução</span>?
          </h2>
          <p className="contact-subtitle">
            Preencha o formulário abaixo e entraremos em contato via WhatsApp
          </p>

          <div className="contact-form reveal-fade-up" style={{ '--delay': '0.3s' }}>
            <h3>
              <i className="fas fa-paper-plane" aria-hidden="true"></i> 
              Envie sua mensagem
            </h3>

            {error && (
              <div className="form-error-message" role="alert">
                <i className="fas fa-exclamation-triangle"></i> {error}
              </div>
            )}

            <form noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nome">Nome completo *</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  autoComplete="name"
                  placeholder="Seu nome"
                  required
                  value={form.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={isInvalid('nome')}
                  aria-describedby={isInvalid('nome') ? 'error-nome' : undefined}
                />
                {isInvalid('nome') && (
                  <span id="error-nome" className="field-error">Campo obrigatório</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={touched.email && !!validateForm()?.includes('E-mail')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone (opcional)</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  autoComplete="tel"
                  placeholder="(41) 99999-9999"
                  value={form.telefone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mensagem">Mensagem *</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  placeholder="Conte-nos sua ideia ou dúvida"
                  rows={4}
                  required
                  value={form.mensagem}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={isInvalid('mensagem')}
                />
                {isInvalid('mensagem') && (
                  <span className="field-error">Campo obrigatório</span>
                )}
              </div>

              <button
                type="submit"
                className="btn-cta form-submit-btn"
                disabled={loading}
                aria-label={loading ? 'Enviando mensagem' : 'Enviar via WhatsApp'}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                    <span> Redirecionando...</span>
                  </>
                ) : (
                  <>
                    <i className="fab fa-whatsapp" aria-hidden="true"></i>
                    <span> Enviar via WhatsApp</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Cards de contato lateral */}
        <div className="contact-details reveal-fade-up" style={{ '--delay': '0.2s' }}>
          {contactDetails.map((item) => (
            <div key={item.title} className="detail-item">
              <i className={item.icon} aria-hidden="true"></i>
              <h4>{item.title}</h4>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel || item.title}
                >
                  {item.content}
                </a>
              ) : (
                <span>{item.content}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
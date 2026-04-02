'use client';

import { useState } from 'react';

const contactDetails = [
  {
    icon: 'fas fa-phone-alt',
    title: 'WhatsApp',
    content: '(41) 99755-2818',
    href: 'https://wa.me/5541997552818',
  },
  {
    icon: 'fab fa-instagram',
    title: 'Instagram',
    content: '@neumann_web_solutions',
    href: 'https://www.instagram.com/neumann_web_solutions/',
  },
  {
    icon: 'fas fa-envelope',
    title: 'E-mail',
    content: 'contato@neumannweb.com.br',
    href: 'mailto:contato@neumannweb.com.br',
  },
  {
    icon: 'fas fa-clock',
    title: 'Horário de Atendimento',
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
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.mensagem) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setLoading(true);

    let texto = `Olá! Gostaria de solicitar um orçamento.\n\n`;
    texto += `*Nome:* ${form.nome}\n`;
    texto += `*E-mail:* ${form.email}\n`;
    if (form.telefone) texto += `*Telefone:* ${form.telefone}\n`;
    texto += `*Mensagem:* ${form.mensagem}\n\nAguardo seu retorno!`;

    const url = `https://wa.me/5541997552818?text=${encodeURIComponent(texto)}`;

    setTimeout(() => {
      window.open(url, '_blank');
      setForm({ nome: '', email: '', telefone: '', mensagem: '' });
      setLoading(false);
    }, 1500);
  };

  return (
    <section id="contato" className="contato section-padding cta-section">
      <div className="container contact-container">
        <div className="contact-card-cta reveal-fade-up">
          <h2 className="contact-title">
            Pronto para a sua{' '}
            <span className="text-neon-gradient">Próxima Evolução</span>?
          </h2>
          <p className="contact-subtitle">
            Preencha o formulário abaixo e entraremos em contato via WhatsApp
          </p>

          <div
            className="contact-form reveal-fade-up"
            style={{ '--delay': '0.3s' } as React.CSSProperties}
          >
            <h3>Envie sua mensagem</h3>
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="nome"
                  placeholder="Seu nome"
                  required
                  value={form.nome}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  placeholder="Seu e-mail"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  id="telefone"
                  placeholder="Seu telefone (opcional)"
                  value={form.telefone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  id="mensagem"
                  placeholder="Sua mensagem"
                  rows={3}
                  required
                  value={form.mensagem}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary-glow form-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin" /> Redirecionando...
                  </>
                ) : (
                  <>
                    <i className="fab fa-whatsapp" /> Enviar via WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div
          className="contact-details reveal-fade-up"
          style={{ '--delay': '0.2s' } as React.CSSProperties}
        >
          {contactDetails.map((d) => (
            <div key={d.title} className="detail-item">
              <i className={d.icon} />
              <h4>{d.title}</h4>
              {d.href ? (
                <a href={d.href} target="_blank" rel="noopener noreferrer">
                  {d.content}
                </a>
              ) : (
                <span>{d.content}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
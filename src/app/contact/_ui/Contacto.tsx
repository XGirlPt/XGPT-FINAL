"use client";
import { useState, useRef } from "react";
import emailjs from "emailjs-com"; // Importando o EmailJS
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import CommonInput from "@/components/ui/common-input";
import { Button } from "@/components/ui/button";

function Contacto() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
//   const [recaptchaValue, setRecaptchaValue] = useState(null);

//   const recaptchaRef = useRef<ReCAPTCHA>(null);

//   const handleRecaptchaChange = (value) => {
//     setRecaptchaValue(value); // Atualiza o estado do reCAPTCHA
//   };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    // Validação do reCAPTCHA
    // if (!recaptchaValue) {
    //   toast.error("Por favor, complete o reCAPTCHA antes de enviar.");
    //   return;
    // }

    const templateParams = {
      from_email: email, // Certifique-se que o nome da variável no template do EmailJS é o mesmo
      subject: subject,
      message: message,
    };

    emailjs
      .send(
        "service_dbp2kn8", // Substitua pelo seu ID do serviço
        "template_hghiro9", // Substitua pelo seu ID do template
        templateParams,
        "xinftXeZEUNtgiQHk" // Substitua pela sua chave pública
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        toast.success("Mensagem enviada com sucesso!");

        // Limpa os campos após envio
        setEmail("");
        setSubject("");
        setMessage("");

        // setRecaptchaValue(null);
        // if (recaptchaRef.current) {
        //   recaptchaRef.current.reset(); // Reseta a aparência do reCAPTCHA
        // }
      })
      .catch((err) => {
        console.error("FAILED...", err);
        toast.error("Falha no envio da mensagem. Tente novamente mais tarde.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <section className="bg-gray-800 w-2/5 align-middle justify-between rounded-lg p-6 md:p-8 flex-col m-10 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-pink-500 mb-4">
          {t("contact.title")}
        </h1>
        <h2 className="text-sm font-light text-center text-gray-400 mb-6">
          {t("contact.subtitle")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CommonInput
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={t("contact.email_label")}
            placeholder={t("contact.email_placeholder")}
            required
          />

          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              {t("contact.subject_label")}
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="block p-2 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder={t("contact.subject_placeholder")}
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              {t("contact.message_label")}
            </label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block p-2 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500"
              placeholder={t("contact.message_placeholder")}
              required
            ></textarea>
          </div>

          {/* Botão desativado enquanto o reCAPTCHA não é preenchido */}
          <Button type="submit" className="py-2 md:py-3" variant="guarder">
            {t("contact.send_button")}
          </Button>
        </form>

		{/* <ReCAPTCHA
  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
  onChange={handleRecaptchaChange}
  ref={recaptchaRef}
  className="mt-4"
/> */}

        <ToastContainer />

        <p className="mt-6 text-center text-gray-400 text-sm">
          {t("contact.thank_you_message")}
        </p>
      </section>
    </div>
  );
}

export default Contacto;

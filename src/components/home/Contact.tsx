import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'

export function Contact() {
  const content = siteContent.contact
  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-heading" tabIndex={-1}>
      <Container>
        <div className="contact-heading stack">
          <p className="eyebrow">Ready to make a move?</p>
          <h2 id="contact-heading">Let's talk about<br />what comes next.</h2>
        </div>
        <div className="contact-layout">
          <div className="contact-details">
            <h3>{content.title}</h3>
            <a className="contact-phone" href={content.phoneHref}>{content.phone}</a>
            <p className="contact-brand">{content.brand}</p>
            <div className="contact-information">
              <address>
                {content.address.map((line) => <span className="address-line" key={line}>{line}</span>)}
                <a className="text-link" href={content.directionsHref}>{content.directionsLabel}<span aria-hidden="true">↗</span></a>
              </address>
              <div className="office-hours">
                <h4>{content.hoursTitle}</h4>
                <p>{content.days}<br />{content.hours}</p>
                <p className="section-note">{content.appointments}</p>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <form aria-label={content.formTitle} aria-describedby="contact-status" onSubmit={(event) => event.preventDefault()}>
              <fieldset disabled aria-describedby="contact-status">
                <legend>{content.formTitle}</legend>
                <div className="contact-fields">
                  <label htmlFor="contact-name">Name<input id="contact-name" name="name" autoComplete="name" placeholder="Your name" /></label>
                  <label htmlFor="contact-email">Email <span>(required)</span><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Your email address" required /></label>
                  <label className="message-field" htmlFor="contact-message">Message<textarea id="contact-message" name="message" rows={3} placeholder="Tell us about your next move" /></label>
                </div>
              </fieldset>
              <div className="contact-form-footer">
                <p id="contact-status" className="section-note">{content.unavailable}</p>
                <Button disabled aria-describedby="contact-status">Send<span aria-hidden="true">↗</span></Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}

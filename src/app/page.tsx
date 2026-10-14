import Image from 'next/image';
import Header from '@/components/Header';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { projects, site } from '@/lib/site';

export const revalidate = 3600; // keeps the footer year current

const socials = ([['Instagram', site.instagram], ['LinkedIn', site.linkedin], ['GitHub', site.github]] as const).filter(([, u]) => u);
const tel = site.phone.replace(/[^\d+]/g, '');

export default function Home() {
  const ld = {
    '@context': 'https://schema.org', '@type': 'ProfessionalService', name: site.name, url: site.url,
    description: 'Avenoré Digital Studio designs and develops modern websites, web applications, and digital solutions for businesses.',
    founder: { '@type': 'Person', name: 'Armaan Singh' },
    ...(site.email && { email: site.email }), ...(site.phone && { telephone: site.phone }),
    ...(socials.length && { sameAs: socials.map(([, u]) => u) }),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Header /><Reveal />
      <main id="main">
        <section className="hero" id="top"><div className="wrap hg">
          <div><p className="lab">Independent Digital Studio</p>
            <h1>Digital experiences,<br /><em>thoughtfully built.</em></h1>
            <p className="lead">We design and develop modern websites and web applications for businesses ready to stand out online.</p>
            <div className="cta"><a className="btn solid" href="#contact">Let’s build together ↗</a><a className="btn" href="#work">Explore our work ↓</a></div></div>
          <div className="vis" role="img" aria-label="Concept website for an architecture practice, shown on a laptop and a phone">
            {/* <div className="lap"><div className="scr" aria-hidden="true"><div className="sn"><span>Halden</span><span>Projects &nbsp; Studio &nbsp; Journal &nbsp; Contact</span></div> */}
            <div className="lap"><div className="scr" aria-hidden="true"><div className="sn"><span>Batths</span><span>Projects &nbsp; Studio &nbsp; Journal &nbsp; Contact</span></div>
              <div className="sh"><div><h4>Rooms that<br /><i>remember</i> you.</h4><p>Residential architecture shaped around light, material and the way people live.</p><span className="sb">View projects</span></div><div className="si"></div></div></div><div className="base"></div></div>
            <div className="phn" aria-hidden="true"><div><h4>Rooms that <i>remember</i> you.</h4><span className="sb" style={{ fontSize: '7cqw', padding: '3cqw 6cqw' }}>View projects</span><div className="si"></div></div></div>
            <p className="lab cap">Concept layout, illustrative only</p></div></div></section>

        <section id="studio"><div className="wrap sg"><div><p className="lab rv">01 / The Studio</p><h2 className="rv" style={{ marginTop: '22px', maxWidth: '16ch' }}>Good design gets noticed. Great digital experiences get remembered.</h2><p className="lead rv">Avenoré brings design, development, and technology together to create thoughtful digital experiences that help businesses communicate clearly, build credibility, and grow online.</p></div>
          <div className="frame rv" aria-hidden="true"><span className="lab">Founded by Armaan Singh</span><span className="big">AR</span></div></div></section>

        <section id="services"><div className="wrap"><p className="lab rv">02 / What We Do</p><h2 className="rv" style={{ marginTop: '22px' }}>Everything your digital presence needs.</h2>
          <div className="sv">
            <article className="rv"><svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="5" width="26" height="20" /><path d="M3 11h26M7 8h1M10 8h1" /></svg><h3>Website Design &amp; Development</h3><p>Modern, responsive websites designed around your brand, your audience, and your business goals.</p><ul><li>Business websites</li><li>Portfolio websites</li><li>Landing pages</li><li>Website redesigns</li><li>Responsive development</li></ul></article>
            <article className="rv"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 9l-7 7 7 7M21 9l7 7-7 7M18 6l-4 20" /></svg><h3>Web Applications</h3><p>Functional, scalable web applications built to solve real problems and create useful digital experiences.</p><ul><li>Custom web applications</li><li>Frontend and backend development</li><li>API integration</li><li>Database integration</li><li>Interactive user experiences</li></ul></article>
            <article className="rv"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 24a5 5 0 0 1-.5-10A7 7 0 0 1 22 12a6 6 0 0 1 1 12z" /></svg><h3>Deployment &amp; Cloud</h3><p>Reliable deployment and hosting solutions that help your digital products run smoothly.</p><ul><li>Website deployment</li><li>Cloud hosting configuration</li><li>Domain and DNS setup</li><li>Performance optimisation</li><li>Basic deployment security</li></ul></article>
            <article className="rv"><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="4" /><path d="M8 8l5 5M24 8l-5 5M8 24l5-5M24 24l-5-5" /></svg><h3>Ongoing Support</h3><p>Practical technical support to keep your website updated, stable, and ready to grow.</p><ul><li>Website maintenance</li><li>Bug fixes</li><li>Content updates</li><li>Performance improvements</li><li>Technical assistance</li></ul></article>
          </div></div></section>


        <section id="work"><div className="wrap"><p className="lab rv">03 / Selected Work</p><h2 className="rv" style={{ marginTop: 22 }}>Built with intention.</h2>
          <div id="pl">
            <div className="pl-col">
              {projects.filter((_, i) => i % 2 === 0).map((p, idx) => {
                const originalIndex = idx * 2;
                const isTall = p.aspect ? p.aspect === 'tall' : (originalIndex % 4 === 1 || originalIndex % 4 === 2);
                return (
                  <article className={`pj rv ${isTall ? 'pj-tall' : 'pj-wide'}`} style={{ '--i': originalIndex } as React.CSSProperties} key={p.name}>
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className={`pv has-link ${isTall ? 'pv-tall' : 'pv-wide'}`} aria-label={`View ${p.name}`}>
                        {p.image ? <Image src={p.image} alt={`${p.name} preview`} fill sizes="(min-width:900px) 50vw, 100vw" />
                          : <div className="in"><span className="lab">{String(originalIndex + 1).padStart(2, '0')}</span><div><span className="pn">{p.name}</span><i /><i style={{ width: '35%' }} /></div></div>}
                      </a>
                    ) : (
                      <div className={`pv ${isTall ? 'pv-tall' : 'pv-wide'}`}>
                        {p.image ? <Image src={p.image} alt={`${p.name} preview`} fill sizes="(min-width:900px) 50vw, 100vw" />
                          : <div className="in"><span className="lab">{String(originalIndex + 1).padStart(2, '0')}</span><div><span className="pn">{p.name}</span><i /><i style={{ width: '35%' }} /></div></div>}
                      </div>
                    )}
                    <div className="pm">
                      <h3>{p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>{p.name}</a> : p.name}</h3>
                      <p className="lab">{p.category}</p>
                      <p>{p.description}</p>
                      {p.tech.length > 0 && <p className="tg">{p.tech.join(', ')}</p>}
                      {p.type && <p className="lab">{p.type} project</p>}
                      {p.url && <a className="tl" href={p.url} target="_blank" rel="noopener noreferrer">View Project ↗</a>}
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="pl-col">
              {projects.filter((_, i) => i % 2 !== 0).map((p, idx) => {
                const originalIndex = idx * 2 + 1;
                const isTall = p.aspect ? p.aspect === 'tall' : (originalIndex % 4 === 1 || originalIndex % 4 === 2);
                return (
                  <article className={`pj rv ${isTall ? 'pj-tall' : 'pj-wide'}`} style={{ '--i': originalIndex } as React.CSSProperties} key={p.name}>
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className={`pv has-link ${isTall ? 'pv-tall' : 'pv-wide'}`} aria-label={`View ${p.name}`}>
                        {p.image ? <Image src={p.image} alt={`${p.name} preview`} fill sizes="(min-width:900px) 50vw, 100vw" />
                          : <div className="in"><span className="lab">{String(originalIndex + 1).padStart(2, '0')}</span><div><span className="pn">{p.name}</span><i /><i style={{ width: '35%' }} /></div></div>}
                      </a>
                    ) : (
                      <div className={`pv ${isTall ? 'pv-tall' : 'pv-wide'}`}>
                        {p.image ? <Image src={p.image} alt={`${p.name} preview`} fill sizes="(min-width:900px) 50vw, 100vw" />
                          : <div className="in"><span className="lab">{String(originalIndex + 1).padStart(2, '0')}</span><div><span className="pn">{p.name}</span><i /><i style={{ width: '35%' }} /></div></div>}
                      </div>
                    )}
                    <div className="pm">
                      <h3>{p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>{p.name}</a> : p.name}</h3>
                      <p className="lab">{p.category}</p>
                      <p>{p.description}</p>
                      {p.tech.length > 0 && <p className="tg">{p.tech.join(', ')}</p>}
                      {p.type && <p className="lab">{p.type} project</p>}
                      {p.url && <a className="tl" href={p.url} target="_blank" rel="noopener noreferrer">View Project ↗</a>}
                    </div>
                  </article>
                );
              })}
            </div>
          </div></div></section>
        <section id="approach"><div className="wrap"><p className="lab rv">04 / Our Approach</p><h2 className="rv" style={{ marginTop: '22px' }}>Small studio. Thoughtful execution.</h2>
          <div className="ap">
            <div className="rv"><h3>Purpose before pixels</h3><p>Every design decision should support a clear goal.</p></div>
            <div className="rv"><h3>Design meets function</h3><p>A beautiful interface must also work reliably.</p></div>
            <div className="rv"><h3>Built for real people</h3><p>Create experiences that are intuitive, responsive, and accessible.</p></div>
            <div className="rv"><h3>From idea to deployment</h3><p>Bring design, development, and delivery together in one considered process.</p></div>
          </div></div></section>

        <section id="process"><div className="wrap"><p className="lab rv">05 / The Process</p><h2 className="rv" style={{ marginTop: '22px', maxWidth: '18ch' }}>A clear process. No unnecessary complexity.</h2>
          <ol className="pr">
            <li className="rv"><span className="lab">01</span><h3>Discover</h3><p>Understand the business, goals, audience, scope, and requirements.</p></li>
            <li className="rv"><span className="lab">02</span><h3>Design</h3><p>Establish the visual direction, structure, and user experience.</p></li>
            <li className="rv"><span className="lab">03</span><h3>Develop</h3><p>Build, test, and refine the responsive website or application.</p></li>
            <li className="rv"><span className="lab">04</span><h3>Launch</h3><p>Deploy the finished project, verify its functionality, and provide handover or agreed ongoing support.</p></li>
          </ol></div></section>

        <section id="about"><div className="wrap ab"><div className="pt rv"><span className="lab">Armaan Singh<br />Founder</span></div>
          <div><p className="lab rv">06 / Behind Avenoré</p><h2 className="rv" style={{ marginTop: '22px' }}>Built with curiosity. Driven by craft.</h2>
            <p className="rv">Avenoré is an independent digital studio founded by Armaan Singh, combining a passion for technology, design, and building useful digital products.</p>
            <p className="rv">From designing responsive websites to developing web applications and deploying solutions to the cloud, the focus is on creating digital work that looks considered and works as intended.</p></div></div></section>

        <section className="fin" id="start"><div className="wrap"><p className="lab rv">07 / Have a project in mind?</p><h2 className="rv">Let’s build something meaningful.</h2>
          <p className="lead rv">Whether you need a new website, a better digital experience, or help bringing an idea to life, let’s start with a conversation.</p>
          <div className="cta rv"><a className="btn solid" href="#contact">Start a Project ↗</a></div><small>Tell us what you’re building.</small></div></section>


        <section id="contact"><div className="wrap ct">
          <div><p className="lab">Contact</p><h2 style={{ margin: '22px 0 28px' }}>Tell us what you’re building.</h2>
            <p className="lead" style={{ marginBottom: 32 }}>Share a few details and we’ll take it from there.</p>
            <div className="ci">
              {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
              {site.phone && <a href={`tel:${tel}`}>{site.phone}</a>}
              {socials.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer">{n}</a>)}
            </div></div>
          <ContactForm />
        </div></section>
      </main>
      <footer><div className="wrap"><div className="ft">
        <div><a className="brand" href="#top" aria-label="Avenoré Digital Studio, back to top"><span className="mono" aria-hidden="true">AR</span><span><b>AVENORÉ</b><small>Digital Studio</small></span></a>
          <p style={{ marginTop: 20, color: 'var(--st)', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '1.2rem' }}>Digital experiences, thoughtfully built.</p></div>
        <div><h3>Navigate</h3><ul><li><a href="#work">Work</a></li><li><a href="#services">Services</a></li><li><a href="#process">Process</a></li><li><a href="#about">About</a></li></ul></div>
        <div><h3>Contact</h3><ul><li><a href="#contact">Start a project</a></li>
          {site.email && <li><a href={`mailto:${site.email}`}>{site.email}</a></li>}
          {site.phone && <li><a href={`tel:${tel}`}>{site.phone}</a></li>}</ul></div>
        {socials.length > 0 && <div><h3>Social</h3><ul>{socials.map(([n, u]) => <li key={n}><a href={u} target="_blank" rel="noopener noreferrer">{n}</a></li>)}</ul></div>}
      </div>
        <p className="fb">© {new Date().getFullYear()} Avenoré Digital Studio. Founded by Armaan Singh.</p></div></footer>
    </>
  );
}

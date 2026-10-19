import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './App.css'

function HeartIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 4.9a5.5 5.5 0 0 0-7.8 0L12 5.9l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.3 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  )
}

function Sparkle({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 1.5c1.8 8.6 5.9 12.7 14.5 14.5C21.9 17.8 17.8 21.9 16 30.5 14.2 21.9 10.1 17.8 1.5 16 10.1 14.2 14.2 10.1 16 1.5Z" />
    </svg>
  )
}

const replyMessages = {
  yes: {
    title: 'You just made me smile.',
    copy: 'I’d love to spend some time together. Whenever you’re ready, let’s pick a day for a little coffee date.',
  },
  time: {
    title: 'Take all the time you need.',
    copy: 'Thank you for reading my letter. There’s no pressure to answer right away—your comfort matters to me.',
  },
  no: {
    title: 'Thank you for being honest.',
    copy: 'I respect how you feel, and I’m glad I could tell you what was in my heart. Wishing you only good things.',
  },
}

function App() {
  const [reply, setReply] = useState('')
  const [apologyOpen, setApologyOpen] = useState(false)
  const closeApologyButton = useRef(null)
  const apologyDialog = useRef(null)

  useEffect(() => {
    if (!apologyOpen) return undefined

    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow

    const handleDialogKeys = (event) => {
      if (event.key === 'Escape') {
        setApologyOpen(false)
        return
      }

      if (event.key === 'Tab') {
        const focusable = apologyDialog.current?.querySelectorAll('button')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleDialogKeys)
    closeApologyButton.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleDialogKeys)
      previouslyFocused?.focus?.()
    }
  }, [apologyOpen])

  const scrollTo = (id) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="A note for Akmam, home">
          <span className="wordmark-icon"><HeartIcon /></span>
          <span>A note for <strong>Akmam</strong> <span className="nickname">(AK)</span></span>
        </a>
        <a className="topbar-link" href="#letter">A little something, from me <span aria-hidden="true">↗</span></a>
      </header>

      <main id="top">
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> A SMALL NOTE, WITH A BIG FEELING</div>
            <h1 id="hero-title">For Akmam.</h1>
            <aside className="memory-note" aria-label="A thought I wanted to share with you">
              <div className="memory-label"><span /> THREE MONTHS LATER</div>
              <p className="memory-urdu" lang="ur" dir="rtl">
                آپ نے پچھلی بار کہا تھا:<br />
                “یہ پیار ہے، اٹریکشن ہے؛ کچھ دن میں مجھے بھول جاؤ گے۔”<br />
                تین مہینے گزر گئے، میں اب تک تمہیں نہیں بھولا،<br />
                بلکہ تم پہلے سے بھی زیادہ میرے خیالوں میں بس گئی ہو۔
              </p>
              <p className="memory-translation">“You said it was love, it was attraction, and I’d forget you in a few days. Three months have passed, and I still haven’t forgotten you—in fact, you’re in my thoughts more than ever.”</p>
              <p className="memory-urdu memory-ask" lang="ur" dir="rtl">
                کوئی بھی انسان کامل نہیں؛ ہم سب میں کوئی نہ کوئی کمی ہوتی ہے۔<br />
                مجھے ایک موقع دے کر دیکھیے، میں اپنی غلطیوں سے سیکھوں گا اور پوری کوشش کروں گا کہ آپ کو شکایت کا موقع نہ دوں۔
              </p>
              <p className="memory-translation memory-ask-translation">None of us is perfect; we all have our flaws. Give me a chance, and I’ll learn from my mistakes and do my best not to give you a reason to complain.</p>
              <div className="memory-poem">
                <span className="memory-poem-label" lang="ur" dir="rtl">ایک شعر</span>
                <p className="memory-urdu" lang="ur" dir="rtl">
                  میں آدم کی اولاد ہوں،<br />
                  خطا میری وراثت میں ہے۔
                </p>
                <p className="memory-translation">I am a child of Adam; to err is part of my inheritance.</p>
                <p className="memory-urdu memory-closing" lang="ur" dir="rtl">
                  بس اتنی سی دعا ہے، تمہاری مسکراہٹ سلامت رہے،<br />
                  میری سچی بات تمہارے دل تک آہستہ سے پہنچے۔
                </p>
                <p className="memory-translation memory-closing-translation">My one small wish is that your smile stays bright, and that my honest words reach your heart gently.</p>
              </div>
            </aside>
            <p className="hero-intro">Some words feel too important to keep to myself. So I made you a little corner of the internet to say what’s been on my mind.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollTo('letter')}>
                Read my letter <span aria-hidden="true">↓</span>
              </button>
              <button className="text-button" onClick={() => scrollTo('question')}>Skip to the question <span aria-hidden="true">↗</span></button>
            </div>
            <div className="handwritten-note"><span className="note-scribble">made just for you</span><HeartIcon /></div>
          </div>

          <div className="hero-art">
            <div className="art-sun" />
            <Sparkle className="sparkle sparkle-one" />
            <Sparkle className="sparkle sparkle-two" />
            <span className="art-caption" aria-hidden="true">a little note<br />for someone lovely</span>
            <div className="envelope-shadow" />
            <div className="envelope">
              <div className="envelope-paper">
                <span className="paper-to">dear AK,</span>
                <span className="paper-lines" />
                <span className="paper-lines short" />
                <HeartIcon className="paper-heart" />
              </div>
              <div className="envelope-front" />
              <div className="envelope-flap" />
              <button className="seal" type="button" onClick={() => setApologyOpen(true)} aria-label="Open a little apology note" title="Open a little apology note">
                <HeartIcon />
              </button>
            </div>
            <div className="rose-stem"><span className="rose-leaf leaf-one" /><span className="rose-leaf leaf-two" /><span className="rose-bloom"><i /><i /><i /><i /><i /></span></div>
            <span className="art-date" aria-hidden="true">with all my<br />honesty ♡</span>
            <button className="art-apology-button" type="button" onClick={() => setApologyOpen(true)}>
              Akmam, click here <HeartIcon />
            </button>
          </div>
          <a className="scroll-cue" href="#letter"><span /> keep going</a>
        </section>

        <section className="letter-section section-wrap" id="letter" aria-labelledby="letter-title">
          <div className="section-label"><span>01</span><span className="label-line" /> THE THINGS I MEAN</div>
          <div className="letter-layout">
            <div className="letter-copy">
              <h2 id="letter-title">A little honesty<br /><em>from me to you.</em></h2>
              <p>Akmam (AK), I’ve been wanting to tell you something, and I thought it deserved more than a hurried message.</p>
              <p>There’s something about you that makes the ordinary feel a little brighter. I find myself smiling after we talk, and I’d like the chance to know you better—at a pace that feels right for both of us.</p>
              <p>This is simply me being honest about what’s in my heart. No big expectations, just a sincere question, and the hope that you’ll feel comfortable answering in your own way.</p>
              <div className="letter-signoff"><span>With warmth,</span><strong>Someone who thinks you’re wonderful <HeartIcon /></strong></div>
            </div>

            <aside className="poem-card" aria-labelledby="poem-title">
              <div className="poem-topline"><span className="poem-sparkle">✳</span><span id="poem-title">For Akmam, in Urdu</span><span className="poem-sparkle">✳</span></div>
              <div className="poem-rule" />
              <p className="urdu-poem" lang="ur" dir="rtl">
                مجھ پر اپنا عشق یونہی بے قرار رہنے دو،<br />
                بڑا حسین ہے یہ قرض، مجھے قرض دار رہنے دو۔
              </p>
              <div className="poem-rule poem-rule-bottom" />
              <p className="poem-translation">Let your love keep my heart restless as it is;<br />this debt is beautiful—let me remain in your debt.</p>
              <span className="poem-flower flower-left" aria-hidden="true">✿</span>
              <span className="poem-flower flower-right" aria-hidden="true">✿</span>
            </aside>
          </div>
        </section>

        <section className="question-section" id="question" aria-labelledby="question-title">
          <div className="question-inner">
            <div className="section-label section-label-light"><span>02</span><span className="label-line" /> SO, HERE IT IS</div>
            <HeartIcon className="question-heart" />
            <h2 id="question-title">Would you let me take you<br className="desktop-break" /> out sometime, Akmam?</h2>
            <p className="question-subtitle">Just a little time together, and a chance to see where this feeling goes.</p>
            {!reply ? (
              <div className="reply-actions" aria-label="Choose your answer">
                <button className="button button-light" onClick={() => setReply('yes')}>I’d love that <span aria-hidden="true">♡</span></button>
                <button className="button button-outline" onClick={() => setReply('time')}>I need a little time</button>
                <button className="quiet-link" onClick={() => setReply('no')}>Thank you, but no</button>
              </div>
            ) : (
              <div className="reply-card" role="status" aria-live="polite">
                <div className="reply-card-heart"><HeartIcon /></div>
                <div><h3>{replyMessages[reply].title}</h3><p>{replyMessages[reply].copy}</p></div>
                <button className="reply-reset" onClick={() => setReply('')} aria-label="Change your answer">↺</button>
              </div>
            )}
            <p className="no-pressure">Whatever your answer, thank you for being here and reading this.</p>
          </div>
          <div className="question-decoration deco-one" aria-hidden="true">✳</div>
          <div className="question-decoration deco-two" aria-hidden="true">✧</div>
        </section>
      </main>

      {apologyOpen && createPortal(
        <div className="apology-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setApologyOpen(false)
        }}>
          <section className="apology-card" role="dialog" aria-modal="true" aria-labelledby="apology-title" ref={apologyDialog}>
            <button className="apology-close" type="button" onClick={() => setApologyOpen(false)} ref={closeApologyButton} aria-label="Close apology note">×</button>
            <span className="apology-kicker">a note from my heart</span>
            <HeartIcon className="apology-heart" />
            <h2 id="apology-title">I’m truly sorry, AK.</h2>
            <p>Akmam, I’m truly sorry for how I behaved last time. I’ve thought about my actions, and I know I could have treated you with more care. You deserved patience and respect from me, and I truly regret it.</p>
            <p>I’ll try to do better. You don’t have to reply before you’re ready—I just wanted you to know that I’m sorry.</p>
            <div className="apology-signoff">With sincerity <span>♡</span></div>
            <button className="button button-primary apology-done" type="button" onClick={() => setApologyOpen(false)}>Close this note</button>
          </section>
        </div>,
        document.body,
      )}

      <footer className="footer">
        <span>Made with care, just for Akmam (AK)</span>
        <HeartIcon />
        <span>One honest feeling at a time</span>
      </footer>
    </div>
  )
}

export default App

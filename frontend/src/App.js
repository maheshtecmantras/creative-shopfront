import './App.css';
import axios from 'axios';
import { useMemo, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const smallBanners = [
  {
    title: 'Neon Bloom',
    subtitle: 'Limited Drop',
    description: 'Layered textures meet luminous gradients for a bold entrance.',
    accent: '#F9A826',
  },
  {
    title: 'Daydream Shift',
    subtitle: 'Silky Comfort',
    description: 'Feather-soft fabrics and iridescent trims built for long days.',
    accent: '#FF6F61',
  },
  {
    title: 'Solar Bloom',
    subtitle: 'Slow Fashion',
    description: 'Locally sourced fibers with a handcrafted artisan finish.',
    accent: '#56CCF2',
  },
  {
    title: 'Stellar Pulse',
    subtitle: 'Performance Ready',
    description: 'Cutting-edge engineering hidden inside premium silhouettes.',
    accent: '#6A5BFF',
  },
];

const products = [
  {
    name: 'Aurora Runner',
    price: '$98',
    image:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    tag: 'Hot',
  },
  {
    name: 'Mist Weaver Bag',
    price: '$120',
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    tag: 'New',
  },
  {
    name: 'Glow Mesh Jacket',
    price: '$185',
    image:
      'https://images.unsplash.com/photo-1457005284336-18a82b64b2c6?auto=format&fit=crop&w=600&q=80',
    tag: 'Limited',
  },
  {
    name: 'Orbit Slides',
    price: '$64',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
    tag: 'Test',
  },
  {
    name: 'Signal Cargo Pants',
    price: '$142',
    image:
      'https://images.unsplash.com/photo-1503342452485-86c3a3b6a18a?auto=format&fit=crop&w=600&q=80',
    tag: 'Test',
  },
  {
    name: 'Velvet Edge',
    price: '$78',
    image:
      'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&w=600&q=80',
    tag: 'Test',
  },
];

function App() {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerErrors, setRegisterErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});
  const [authMessage, setAuthMessage] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const smallBannerRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < smallBanners.length; i += 2) {
      rows.push(smallBanners.slice(i, i + 2));
    }
    return rows;
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();
    setRegisterErrors({});
    setStatusMessage(null);

    const clientErrors = {};
    if (!registerForm.name.trim()) clientErrors.name = 'Name is required.';
    if (!registerForm.email.trim()) clientErrors.email = 'Email is required.';
    if (!registerForm.password) clientErrors.password = 'Password is required.';
    if (registerForm.password.length && registerForm.password.length < 8) {
      clientErrors.password = 'Password must be at least 8 characters.';
    }
    if (registerForm.password !== registerForm.password_confirmation) {
      clientErrors.password_confirmation = 'Passwords must match.';
    }

    if (Object.keys(clientErrors).length) {
      setRegisterErrors(clientErrors);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${API_BASE}/register`, registerForm);
      setAuthMessage(data.message);
      setStatusMessage({ type: 'success', text: 'Account created and token issued.' });
      setRegisterForm({ name: '', email: '', password: '', password_confirmation: '' });
    } catch (error) {
      const responseData = error?.response?.data;
      if (responseData?.errors) {
        setRegisterErrors(responseData.errors);
      } else {
        setStatusMessage({
          type: 'error',
          text: responseData?.message || 'Something went wrong. Please try again.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginErrors({});
    setStatusMessage(null);

    const clientErrors = {};
    if (!loginForm.email.trim()) clientErrors.email = 'Email is required.';
    if (!loginForm.password) clientErrors.password = 'Password is required.';

    if (Object.keys(clientErrors).length) {
      setLoginErrors(clientErrors);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${API_BASE}/login`, loginForm);
      setAuthMessage(data.message);
      setStatusMessage({ type: 'success', text: 'You are now logged in.' });
      setLoginForm({ email: '', password: '' });
    } catch (error) {
      const responseData = error?.response?.data;
      if (responseData?.errors) {
        setLoginErrors(responseData.errors);
      } else {
        setStatusMessage({
          type: 'error',
          text: responseData?.message || 'Unable to log in. Please check your credentials.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="hero">
        <div className="hero__content">
          <p className="tag">Creative Studio · Capsule 04</p>
          <h1>
            Main Banner
            <br />
            for the curious trendsetters.
          </h1>
          <p className="hero__description">
            A luminous narrative of gradients, mirrored glass panels, and slow-crafted pieces tailored for
            everyday rituals. Every product story ends where you take the stage.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary">Explore the drop</button>
            <button className="btn btn--ghost">View lookbook</button>
          </div>
        </div>
        <div className="hero__badge">Handpicked textures · 02.23</div>
      </div>

      <section className="small-banners">
        {smallBannerRows.map((row, rowIndex) => (
          <div className="small-banners__row" key={rowIndex}>
            {row.map((banner) => (
              <article className="small-banner" key={banner.title}>
                <div className="small-banner__inner" style={{ borderColor: banner.accent }}>
                  <p className="small-banner__subtitle">{banner.subtitle}</p>
                  <h3>{banner.title}</h3>
                  <p>{banner.description}</p>
                </div>
              </article>
            ))}
          </div>
        ))}
      </section>

      <section className="products">
        <header className="products__header">
          <div>
            <p className="tag">Test Product Imagery</p>
            <h2>Objects of curiosity</h2>
          </div>
          <button className="btn btn--ghost">See all media</button>
        </header>
        <div className="products__grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-card__image">
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className="product-card__label">{product.tag}</span>
              </div>
              <div className="product-card__body">
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="auth">
        <header>
          <p className="tag">Register & Login</p>
          <h2>Lock in your access</h2>
          <p>
            Create an account or log in to discover how the CMS-crafted collection syncs with your personal
            palette. All interactions use encrypted API tokens.
          </p>
        </header>
        <div className="auth__grid">
          <form className="auth__card" onSubmit={handleRegister} noValidate>
            <h3>Create an account</h3>
            <label>
              Name
              <input
                type="text"
                value={registerForm.name}
                onChange={(event) => setRegisterForm({ ...registerForm, name: event.target.value })}
                className={registerErrors.name ? 'has-error' : ''}
              />
              {registerErrors.name && <span className="input-error">{registerErrors.name}</span>}
            </label>
            <label>
              Email
              <input
                type="email"
                value={registerForm.email}
                onChange={(event) => setRegisterForm({ ...registerForm, email: event.target.value })}
                className={registerErrors.email ? 'has-error' : ''}
              />
              {registerErrors.email && <span className="input-error">{registerErrors.email}</span>}
            </label>
            <label>
              Password
              <input
                type="password"
                value={registerForm.password}
                onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })}
                className={registerErrors.password ? 'has-error' : ''}
              />
              {registerErrors.password && <span className="input-error">{registerErrors.password}</span>}
            </label>
            <label>
              Confirm password
              <input
                type="password"
                value={registerForm.password_confirmation}
                onChange={(event) =>
                  setRegisterForm({ ...registerForm, password_confirmation: event.target.value })
                }
                className={registerErrors.password_confirmation ? 'has-error' : ''}
              />
              {registerErrors.password_confirmation && (
                <span className="input-error">{registerErrors.password_confirmation}</span>
              )}
            </label>
            <button className="btn btn--primary" type="submit" disabled={loading}>
              {loading ? 'Working...' : 'Register'}
            </button>
          </form>

          <form className="auth__card" onSubmit={handleLogin} noValidate>
            <h3>Already part of the crew?</h3>
            <label>
              Email
              <input
                type="email"
                value={loginForm.email}
                onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
                className={loginErrors.email ? 'has-error' : ''}
              />
              {loginErrors.email && <span className="input-error">{loginErrors.email}</span>}
            </label>
            <label>
              Password
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                className={loginErrors.password ? 'has-error' : ''}
              />
              {loginErrors.password && <span className="input-error">{loginErrors.password}</span>}
            </label>
            <button className="btn btn--primary" type="submit" disabled={loading}>
              {loading ? 'Holding tight...' : 'Login'}
            </button>
          </form>
        </div>
        {statusMessage && (
          <p className={`auth__status auth__status--${statusMessage.type}`}>
            {statusMessage.text}
          </p>
        )}
        {authMessage && <p className="auth__message">{authMessage}</p>}
      </section>
    </div>
  );
}

export default App;

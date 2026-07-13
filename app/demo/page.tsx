'use client';

import { FormEvent, useEffect, useState, type CSSProperties } from 'react';
import StoryCard from '@/components/StoryCard/StoryCard';
import SaveStory from '@/components/SaveStory/SaveStory';
import { nextServer } from '@/lib/api/api';
import { login, register } from '@/lib/api/auth';
import {
  checkIsSaved,
  deleteSavedStory,
  getSavedStories,
  saveStory,
} from '@/lib/api/savedStoriesApi';
import type { PaginatedResponse } from '@/types/api';
import type { Story } from '@/types/story';

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #b2b2b2',
  borderRadius: 8,
};

const buttonStyle: CSSProperties = {
  padding: '10px 14px',
  borderRadius: 8,
  background: '#5dbe5c',
  color: '#000',
  fontWeight: 600,
  cursor: 'pointer',
};

const panelStyle: CSSProperties = {
  marginBottom: 32,
  padding: 16,
  border: '1px solid #d8d8d8',
  borderRadius: 12,
  background: '#fff',
};

export default function DemoPage() {
  const [registerName, setRegisterName] = useState('Demo User');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('Password123');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('Password123');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [userName, setUserName] = useState('');
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [storyId, setStoryId] = useState('');
  const [apiResult, setApiResult] = useState('Тут буде відповідь backend');
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = Boolean(accessToken);

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken') || '');
    setRefreshToken(localStorage.getItem('refreshToken') || '');
  }, []);

  const writeResult = (value: unknown) => {
    setApiResult(JSON.stringify(value, null, 2));
  };

  const runApiAction = async (action: () => Promise<unknown>) => {
    setIsLoading(true);
    try {
      const result = await action();
      writeResult(result ?? { success: true });
    } catch (error) {
      writeResult({
        success: false,
        message:
          error instanceof Error ? error.message : 'Невідома помилка запиту',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    runApiAction(async () => {
      const user = await register({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });

      setLoginEmail(registerEmail);
      setLoginPassword(registerPassword);

      return {
        success: true,
        message:
          'Register success. Тепер натисни Login, бо register token не повертає.',
        user,
      };
    });
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    runApiAction(async () => {
      const response = await login({
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      setUserName(response.data.user.name);

      return response;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken('');
    setRefreshToken('');
    setUserName('');
    writeResult({ success: true, message: 'Local logout complete' });
  };

  const handleGenerateEmail = () => {
    const email = `dev6-${Date.now()}@test.com`;
    setRegisterEmail(email);
    setLoginEmail(email);
    setRegisterPassword('Password123');
    setLoginPassword('Password123');
    writeResult({
      success: true,
      message: 'Generated fresh test email. Тепер натисни Register.',
      email,
      password: 'Password123',
    });
  };

  const handleLoadStories = () => {
    runApiAction(async () => {
      const { data: response } = await nextServer.get<PaginatedResponse<Story>>(
        '/stories',
        { params: { page, perPage } }
      );
      setStories(response.data);
      setStoryId(response.data[0]?._id || '');
      return response;
    });
  };

  return (
    <main>
      <div className="container">
        <h1 style={{ marginBottom: 12 }}>🧪 Dev 6 demo стенд</h1>
        <p style={{ marginBottom: 24 }}>
          Backend: <code>{nextServer.defaults.baseURL}</code>
        </p>

        <section style={panelStyle}>
          <h2 style={{ marginBottom: 16 }}>1. Auth: register / login</h2>
          <button
            style={{ ...buttonStyle, marginBottom: 16 }}
            type="button"
            onClick={handleGenerateEmail}
          >
            Generate test email
          </button>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            <form
              onSubmit={handleRegister}
              style={{ display: 'grid', gap: 10 }}
            >
              <h3>Register</h3>
              <input
                style={inputStyle}
                value={registerName}
                onChange={e => setRegisterName(e.target.value)}
                placeholder="name"
              />
              <input
                style={inputStyle}
                value={registerEmail}
                onChange={e => setRegisterEmail(e.target.value)}
                placeholder="email"
                type="email"
              />
              <input
                style={inputStyle}
                value={registerPassword}
                onChange={e => setRegisterPassword(e.target.value)}
                placeholder="password"
                type="password"
              />
              <button style={buttonStyle} disabled={isLoading} type="submit">
                Register
              </button>
            </form>

            <form onSubmit={handleLogin} style={{ display: 'grid', gap: 10 }}>
              <h3>Login</h3>
              <input
                style={inputStyle}
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="email"
                type="email"
              />
              <input
                style={inputStyle}
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="password"
                type="password"
              />
              <button style={buttonStyle} disabled={isLoading} type="submit">
                Login
              </button>
              <button
                style={{ ...buttonStyle, background: '#d8d8d8' }}
                type="button"
                onClick={handleLogout}
              >
                Clear local tokens
              </button>
            </form>
          </div>

          <div style={{ marginTop: 16 }}>
            <p>
              Status:{' '}
              <strong>{isAuthenticated ? 'authorized' : 'guest'}</strong>
              {userName ? ` as ${userName}` : ''}
            </p>
            <p style={{ wordBreak: 'break-all' }}>
              accessToken: <code>{accessToken || 'empty'}</code>
            </p>
            <p style={{ wordBreak: 'break-all' }}>
              refreshToken: <code>{refreshToken || 'empty'}</code>
            </p>
          </div>
        </section>

        <section style={panelStyle}>
          <h2 style={{ marginBottom: 16 }}>2. Stories з backend</h2>
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              marginBottom: 16,
            }}
          >
            <input
              style={{ ...inputStyle, width: 120 }}
              value={page}
              min={1}
              onChange={e => setPage(Number(e.target.value))}
              type="number"
              aria-label="page"
            />
            <input
              style={{ ...inputStyle, width: 120 }}
              value={perPage}
              min={1}
              max={30}
              onChange={e => setPerPage(Number(e.target.value))}
              type="number"
              aria-label="perPage"
            />
            <button
              style={buttonStyle}
              disabled={isLoading}
              type="button"
              onClick={handleLoadStories}
            >
              Load stories
            </button>
          </div>
        </section>

        <section style={panelStyle}>
          <h2 style={{ marginBottom: 16 }}>
            3. Manual Dev 6 saved stories test
          </h2>
          <input
            style={{ ...inputStyle, marginBottom: 12 }}
            value={storyId}
            onChange={e => setStoryId(e.target.value)}
            placeholder="storyId"
          />
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              marginBottom: 16,
            }}
          >
            <button
              style={buttonStyle}
              type="button"
              disabled={isLoading || !accessToken || !storyId}
              onClick={() =>
                runApiAction(async () => ({
                  isSaved: await checkIsSaved(storyId, accessToken),
                }))
              }
            >
              GET check isSaved
            </button>
            <button
              style={buttonStyle}
              type="button"
              disabled={isLoading || !accessToken || !storyId}
              onClick={() =>
                runApiAction(() => saveStory(storyId, accessToken))
              }
            >
              POST save
            </button>
            <button
              style={buttonStyle}
              type="button"
              disabled={isLoading || !accessToken || !storyId}
              onClick={() =>
                runApiAction(() => deleteSavedStory(storyId, accessToken))
              }
            >
              DELETE saved
            </button>
            <button
              style={buttonStyle}
              type="button"
              disabled={isLoading || !accessToken}
              onClick={() => runApiAction(() => getSavedStories(accessToken))}
            >
              GET saved list
            </button>
          </div>

          <pre
            style={{
              whiteSpace: 'pre-wrap',
              padding: 12,
              background: '#191919',
              color: '#fff',
              borderRadius: 8,
              maxHeight: 420,
              overflow: 'auto',
            }}
          >
            {isLoading ? 'Loading...' : apiResult}
          </pre>
        </section>

        <h2 style={{ marginBottom: 16 }}>StoryCard clean preview</h2>
        {stories.length > 0 ? (
          <div>
            {stories.map(story => (
              <StoryCard
                key={story._id}
                story={story}
                isAuthenticated={isAuthenticated}
                authToken={accessToken}
              />
            ))}
          </div>
        ) : (
          <p style={{ marginBottom: 32 }}>
            Натисни Load stories, щоб отримати реальні історії з backend.
          </p>
        )}

        <h2 style={{ marginBottom: 16, marginTop: 32 }}>
          SaveStory clean preview
        </h2>
        {storyId ? (
          <SaveStory
            storyId={storyId}
            isAuthenticated={isAuthenticated}
            authToken={accessToken}
          />
        ) : (
          <p>Обери або завантаж storyId.</p>
        )}
      </div>
    </main>
  );
}

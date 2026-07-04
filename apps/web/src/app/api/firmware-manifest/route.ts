export async function GET() {
  const manifest = {
    name: 'ESP32 Dual-Channel 2.4GHz RF Jammer & Deauther',
    version: '1.0.0',
    builds: [
      {
        chipFamily: 'ESP32',
        parts: [
          {
            path: 'https://files.catbox.moe/u3m9ml.bin',
            offset: 4096,
          },
          {
            path: 'https://files.catbox.moe/aolspz.bin',
            offset: 32768,
          },
          {
            path: 'https://files.catbox.moe/3xtr31.bin',
            offset: 65536,
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
}

-- Tabla para suscriptores del newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'website',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para búsquedas por email
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Índice para filtrar por estado
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(is_active);

-- RLS (Row Level Security) - Permitir inserciones públicas
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT desde la aplicación (usuarios anónimos)
CREATE POLICY "Allow public insert" ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política para permitir SELECT solo a usuarios autenticados (admin)
CREATE POLICY "Allow authenticated select" ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_newsletter_subscribers_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comentarios para documentación
COMMENT ON TABLE newsletter_subscribers IS 'Suscriptores del newsletter de B&V Soluciones';
COMMENT ON COLUMN newsletter_subscribers.email IS 'Email del suscriptor (único)';
COMMENT ON COLUMN newsletter_subscribers.name IS 'Nombre completo del suscriptor';
COMMENT ON COLUMN newsletter_subscribers.source IS 'Origen de la suscripción (website, landing-page, etc)';
COMMENT ON COLUMN newsletter_subscribers.is_active IS 'Estado de la suscripción (activa/cancelada)';

create table if not exists productos (
  id bigint generated always as identity primary key,
  nombre text not null,
  descripcion text default '',
  precio numeric(10, 2) not null default 0,
  stock integer not null default 0 check (stock >= 0),
  created_at timestamp with time zone default now()
);

create table if not exists pedidos (
  id bigint generated always as identity primary key,
  producto_id bigint references productos(id) on delete set null,
  cliente text not null,
  email text not null,
  producto text,
  cantidad integer not null check (cantidad > 0),
  fecha_retiro date not null,
  estado text not null default 'pendiente',
  created_at timestamp with time zone default now()
);

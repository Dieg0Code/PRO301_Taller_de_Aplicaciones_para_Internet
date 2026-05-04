create extension if not exists "pgcrypto";

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  owner_name text not null,
  pet_name text not null,
  pet_type text not null,
  service text not null,
  appointment_date date not null,
  appointment_time time not null,
  phone text not null,
  notes text,
  status text not null default 'pendiente' check (status in ('pendiente', 'confirmada', 'cancelada')),
  created_at timestamptz not null default now()
);

create unique index if not exists bookings_unique_active_slot
on public.bookings (appointment_date, appointment_time, service)
where status in ('pendiente', 'confirmada');

alter table public.bookings enable row level security;

create policy "Allow inserts with service role"
on public.bookings
for insert
to service_role
with check (true);

Docker ile proje kurulumu için:
1. Docker Desktop uygulamasının bilgisayarda olduğundan emin olduktan sonra;
2. "docker compose up --build" komutu çalıştırılır.
3. Önceki terminal açık kalıyor olduktan sonra yeni bir terminal açılarak "docker compose exec app bash" komutu çalıştırılır.
4. gelen kısımda "npx prisma generate" komutu çalıştırılır.
5. "npx prisma migrate dev --name init" komutu çalıştırılır.


Docker kullanmadan proje kurulumu için:
Proje Kurulumu
1. Node versionun 18 olduğundan emin olunur.
2. PostgreSQL kurulu olduğundan emin olunur.
3. yarn install komutu çalıştırılır.
4. yarn build komutu çalıştırılır.
5. yarn start komutu ile proje ayaklandırılır.

Docker ile proje kurulumu için:
1. Docker Desktop uygulamasının bilgisayarda olduğundan emin olduktan sonra;
2. node 18 versionu ile yarn install atılır.
3. "docker compose up --build" komutu çalıştırılır. Bittikten sonra;
4. Önceki terminal açık kalıyor olduktan sonra yeni bir terminal açılarak "docker compose exec app bash" komutu çalıştırılır.
5. gelen kısımda "npx prisma generate" komutu çalıştırılır.
6. "npx prisma migrate dev --name init" komutu çalıştırılır.


Docker kullanmadan proje kurulumu için:
1. Node versionun 18 olduğundan emin olunur.
2. PostgreSQL kurulu olduğundan emin olunur.
3. yarn install komutu çalıştırılır.
4. yarn build komutu çalıştırılır.
5. yarn start komutu ile proje ayaklandırılır.

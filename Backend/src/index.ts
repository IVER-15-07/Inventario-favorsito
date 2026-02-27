import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` Servidor listo en port: ${PORT}`);
    console.log(` Documentación en port: ${PORT}/api-docs`);
});
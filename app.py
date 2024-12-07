from flask import Flask, render_template, request
from pytube import Search

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/gera-plano', methods=['POST'])
def gera_plano():
    data = request.form
    tempo_disponivel = int(data['tempo_disponivel'])
    tempo_unidade = data['tempo_unidade']

    topicos = []
    videos_recomendados = {}

    for i in range(1, int(data['num_topicos']) + 1):
        nome_topico = data[f'topico_{i}']
        prioridade = data[f'prioridade{i}']
        dificuldade = data[f'dificuldade_{i}']
        
        videos = pesquisar_videos_youtube(nome_topico)
        videos_recomendados[nome_topico] = videos
        
        topicos.append({
            'name': nome_topico,
            'priority': prioridade,
            'difficulty': dificuldade
        })
    
    peso_total = 0
    for topico in topicos:
        if topico['priority'] == 'Alta':
            peso = 1
        elif topico['priority'] == 'Média':
            peso = 0.5
        else:
            peso = 0.25

        if topico['difficulty'] == 'Fácil':
            peso *= 1
        elif topico['difficulty'] == 'Médio':
            peso *= 1.5
        else:
            peso *= 2

        topico['peso'] = peso
        peso_total += peso
    
    plano_estudo = []
    tempo_total = 0
    for topico in topicos:
        tempo_alocado = (topico['peso'] / peso_total) * tempo_disponivel
        plano_estudo.append({
            'order': len(plano_estudo) + 1,
            'topic': topico['name'],
            'time_allocated': round(tempo_alocado, 2)
        })
        tempo_total += tempo_alocado

    diferença_tempo = round(tempo_disponivel - tempo_total, 2)
    if diferença_tempo != 0:
        plano_estudo[0]['time_allocated'] += diferença_tempo

    return render_template('study_plan.html', plano_estudo=plano_estudo, total_time=round(tempo_total, 2), videos_recomendados=videos_recomendados, tempo_unidade=tempo_unidade)


def pesquisar_videos_youtube(consulta, max_resultados=3):
    search = Search(consulta)
    search_results = search.results[:max_resultados]
    videos = []

    for video in search_results:
        video_url = f"https://www.youtube.com/watch?v={video.video_id}"
        videos.append({'title': video.title, 'url': video_url})

    return videos

if __name__ == '__main__':
    app.run(debug=True)

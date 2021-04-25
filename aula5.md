# 1 -> Reestruturação
 * mudar a extensão do arquivo PlayerContexts.ts para .tsx
 * Criar uma nova função no PlayerContexts chamada PlayerContextProvider e passa o conteudo do contexto para lá.
 * colocar para retornar o playercontext.Provider <- ele recebe o conteudo children

# 2 CONTROLE DO PROXIMO E ANTERIOR
  * 1 -> no contexto, criar uma nova função (playList) que recebe um array( a lista de episodios) e o index (id do episodio tocando)
  
  * 2 -> passar a lista, o index e dar player no ep pelo controle do state.

  * 3 -> retornar a função criada junto cos as outras funcionalidades, adiciona a tipagem

  * 4 -> no index criar uma nova constante para armazenar todos os episodios (...) 

  * 5 -> substituir a importação do play por playlist

  * 6 -> colocar nas funções para passar a lista de episodios e o index dos episodios.
  * 6.1 -> no allepisodes somar o index com o dos ultimos lançamentos.

  * 7-> criar no context a função proximo index +1 e o previos -1

  * 8 -> verificar o botão previous caso não tenha musica anterior.
  
  * 8.1 -> criar verificadores (hasNext e hasPrevious que no context recebem valores boleanos  - usar verificação na função next e previou)


# 3 AJUSTES

  *1 -> NO PLAYER CRIAR NA TAG AUDIO O EVENTO ONENDED(handleepisodeEnded)

  * 2 -> CRIAR A FUNÇÃO, ALTERAR O FUNCIONAMENTO DO HASNEXT PARA VERIFICAR SE TA EM ALEATORIO 

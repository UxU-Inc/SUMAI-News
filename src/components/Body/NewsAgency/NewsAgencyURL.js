import * as NewsAgencyName from './NewsAgencyName'

export default function NewsAgencyURL(news_agency) {
  let newsAgencyURL;

  switch (news_agency) {
    case NewsAgencyName.BBS_NEWS:
      newsAgencyURL = "http://news.bbsi.co.kr/";
      break;
    case NewsAgencyName.CEO스코어데일리:
      newsAgencyURL = "http://www.ceoscoredaily.com/";
      break;
    case NewsAgencyName.CNB뉴스:
      newsAgencyURL = "http://www.cnbnews.com/";
      break;
    case NewsAgencyName.EBN:
      newsAgencyURL = "http://www.ebn.co.kr/";
      break;
    case NewsAgencyName.EBS:
      newsAgencyURL = "http://home.ebs.co.kr/ebsnews";
      break;
    case NewsAgencyName.e대한경제:
      newsAgencyURL = "https://www.dnews.co.kr/";
      break;
    case NewsAgencyName.IT동아:
      newsAgencyURL = "http://it.donga.com/";
      break;
    case NewsAgencyName.IT조선:
      newsAgencyURL = "http://it.chosun.com/";
      break;
    case NewsAgencyName.JTBC:
      newsAgencyURL = "http://news.jtbc.joins.com/";
      break;
    case NewsAgencyName.KBC광주방송:
      newsAgencyURL = "http://www.ikbc.co.kr/jw_2ds/?menu_id=56";
      break;
    case NewsAgencyName.KBS_World:
      newsAgencyURL = "http://world.kbs.co.kr/english/";
      break;
    case NewsAgencyName.KBS:
      newsAgencyURL = "http://news.kbs.co.kr/";
      break;
    case NewsAgencyName.KNN:
      newsAgencyURL = "http://www.knn.co.kr/";
      break;
    case NewsAgencyName.MBC:
      newsAgencyURL = "http://imnews.imbc.com/";
      break;
    case NewsAgencyName.MBN:
      newsAgencyURL = "http://mbn.mk.co.kr/pages/news/index.html";
      break;
    case NewsAgencyName.MK스포츠:
      newsAgencyURL = "http://sports.mk.co.kr/";
      break;
    case NewsAgencyName.MONEY:
      newsAgencyURL = "http://magazine.hankyung.com/money/";
      break;
    case NewsAgencyName.M이코노미뉴스:
      newsAgencyURL = "http://www.m-economynews.com/";
      break;
    case NewsAgencyName.OBS:
      newsAgencyURL = "http://www.obsnews.co.kr/";
      break;
    case NewsAgencyName.OSEN:
      newsAgencyURL = "http://osen.mt.co.kr/";
      break;
    case NewsAgencyName.PC사랑:
      newsAgencyURL = "http://www.ilovepc.co.kr/";
      break;
    case NewsAgencyName.PD저널:
      newsAgencyURL = "http://www.pdjournal.com/";
      break;
    case NewsAgencyName.SBS_Biz:
      newsAgencyURL = "https://biz.sbs.co.kr/";
      break;
    case NewsAgencyName.SBS:
      newsAgencyURL = "http://news.sbs.co.kr/";
      break;
    case NewsAgencyName.SBS연예뉴스:
      newsAgencyURL = "http://ent.sbs.co.kr/";
      break;
    case NewsAgencyName.TBC:
      newsAgencyURL = "http://www.tbc.co.kr/tbc_news/news_main14.html";
      break;
    case NewsAgencyName.TBS:
      newsAgencyURL = "http://tbs.seoul.kr/news/index.do";
      break;
    case NewsAgencyName.TheAsiaN:
      newsAgencyURL = "http://kor.theasian.asia/";
      break;
    case NewsAgencyName.TV리포트:
      newsAgencyURL = "http://tvreport.co.kr/";
      break;
    case NewsAgencyName.TV조선:
      newsAgencyURL = "http://news.tv.chosun.com/";
      break;
    case NewsAgencyName.UPI뉴스:
      newsAgencyURL = "https://www.upinews.kr/";
      break;
    case NewsAgencyName.YONHAPNEWS:
      newsAgencyURL = "http://en.yna.co.kr/";
      break;
    case NewsAgencyName.YTN:
      newsAgencyURL = "http://www.ytn.co.kr/";
      break;
    case NewsAgencyName.YTN사이언스:
      newsAgencyURL = "http://science.ytn.co.kr/";
      break;
    case NewsAgencyName.ZDNet_Korea:
      newsAgencyURL = "http://zdnet.co.kr/";
      break;
    case NewsAgencyName.강원도민일보:
      newsAgencyURL = "http://www.kado.net/";
      break;
    case NewsAgencyName.강원일보:
      newsAgencyURL = "http://www.kwnews.co.kr/";
      break;
    case NewsAgencyName.게임메카:
      newsAgencyURL = "http://www.gamemeca.com/";
      break;
    case NewsAgencyName.경기일보:
      newsAgencyURL = "http://www.kyeonggi.com/";
      break;
    case NewsAgencyName.경남도민일보:
      newsAgencyURL = "http://www.idomin.com/";
      break;
    case NewsAgencyName.경남신문:
      newsAgencyURL = "http://www.knnews.co.kr/";
      break;
    case NewsAgencyName.경북도민일보:
      newsAgencyURL = "http://www.hidomin.com/";
      break;
    case NewsAgencyName.경북매일:
      newsAgencyURL = "http://www.kbmaeil.com/";
      break;
    case NewsAgencyName.경북일보:
      newsAgencyURL = "http://www.kyongbuk.co.kr/";
      break;
    case NewsAgencyName.경상일보:
      newsAgencyURL = "http://ksilbo.co.kr/";
      break;
    case NewsAgencyName.경인일보:
      newsAgencyURL = "http://www.kyeongin.com/";
      break;
    case NewsAgencyName.경향신문:
      newsAgencyURL = "http://www.khan.co.kr/";
      break;
    case NewsAgencyName.광주드림:
      newsAgencyURL = "http://www.gjdream.com/";
      break;
    case NewsAgencyName.국민일보:
      newsAgencyURL = "http://www.kmib.co.kr/";
      break;
    case NewsAgencyName.국방일보:
      newsAgencyURL = "http://kookbang.dema.mil.kr/";
      break;
    case NewsAgencyName.국제신문:
      newsAgencyURL = "http://www.kookje.co.kr/";
      break;
    case NewsAgencyName.그린포스트코리아:
      newsAgencyURL = "http://www.greenpostkorea.co.kr/";
      break;
    case NewsAgencyName.기호일보:
      newsAgencyURL = "http://www.kihoilbo.co.kr/";
      break;
    case NewsAgencyName.나우뉴스:
      newsAgencyURL = "https://nownews.seoul.co.kr/";
      break;
    case NewsAgencyName.낚시춘추:
      newsAgencyURL = "http://fish.darakwon.co.kr/";
      break;
    case NewsAgencyName.넥스트데일리:
      newsAgencyURL = "http://www.nextdaily.co.kr/";
      break;
    case NewsAgencyName.노컷뉴스:
      newsAgencyURL = "http://www.nocutnews.co.kr/";
      break;
    case NewsAgencyName.농민신문:
      newsAgencyURL = "http://www.nongmin.com/";
      break;
    case NewsAgencyName.뉴데일리:
      newsAgencyURL = "http://www.newdaily.co.kr/";
      break;
    case NewsAgencyName.뉴스1:
      newsAgencyURL = "http://news1.kr/";
      break;
    case NewsAgencyName.뉴스엔:
      newsAgencyURL = "http://www.newsen.com/";
      break;
    case NewsAgencyName.뉴스컬처:
      newsAgencyURL = "http://nc.asiae.co.kr/";
      break;
    case NewsAgencyName.뉴스타파:
      newsAgencyURL = "http://newstapa.org/";
      break;
    case NewsAgencyName.뉴스토마토:
      newsAgencyURL = "http://www.newstomato.com/";
      break;
    case NewsAgencyName.뉴스핌:
      newsAgencyURL = "http://newspim.com/";
      break;
    case NewsAgencyName.뉴시스:
      newsAgencyURL = "http://newsis.com/";
      break;
    case NewsAgencyName.대구일보:
      newsAgencyURL = "http://www.idaegu.com/";
      break;
    case NewsAgencyName.대전일보:
      newsAgencyURL = "http://www.daejonilbo.com/";
      break;
    case NewsAgencyName.더스쿠프:
      newsAgencyURL = "http://thescoop.co.kr/";
      break;
    case NewsAgencyName.더팩트:
      newsAgencyURL = "http://www.tf.co.kr/";
      break;
    case NewsAgencyName.데이터뉴스:
      newsAgencyURL = "http://www.datanews.co.kr/";
      break;
    case NewsAgencyName.데일리NK:
      newsAgencyURL = "https://www.dailynk.com/";
      break;
    case NewsAgencyName.데일리안:
      newsAgencyURL = "http://www.dailian.co.kr/";
      break;
    case NewsAgencyName.데일리한국:
      newsAgencyURL = "http://daily.hankooki.com/";
      break;
    case NewsAgencyName.독서신문:
      newsAgencyURL = "http://www.readersnews.com/";
      break;
    case NewsAgencyName.동아사이언스:
      newsAgencyURL = "http://news.dongascience.com/";
      break;
    case NewsAgencyName.동아일보:
      newsAgencyURL = "http://www.donga.com/";
      break;
    case NewsAgencyName.디자인정글:
      newsAgencyURL = "http://jungle.co.kr/";
      break;
    case NewsAgencyName.디지털데일리:
      newsAgencyURL = "http://www.ddaily.co.kr/";
      break;
    case NewsAgencyName.디지털타임스:
      newsAgencyURL = "http://www.dt.co.kr/";
      break;
    case NewsAgencyName.디지털투데이:
      newsAgencyURL = "http://www.digitaltoday.co.kr/";
      break;
    case NewsAgencyName.르몽드_디플로마티크:
      newsAgencyURL = "http://ilemonde.com/";
      break;
    case NewsAgencyName.마이데일리:
      newsAgencyURL = "http://www.mydaily.co.kr/";
      break;
    case NewsAgencyName.매경이코노미:
      newsAgencyURL = "http://economy.mk.co.kr/";
      break;
    case NewsAgencyName.매일경제:
      newsAgencyURL = "http://www.mk.co.kr/";
      break;
    case NewsAgencyName.매일노동뉴스:
      newsAgencyURL = "http://www.labortoday.co.kr/";
      break;
    case NewsAgencyName.매일신문:
      newsAgencyURL = "http://news.imaeil.com/";
      break;
    case NewsAgencyName.맥스무비:
      newsAgencyURL = "http://www.maxmovie.com/";
      break;
    case NewsAgencyName.머니S:
      newsAgencyURL = "http://www.moneys.news/";
      break;
    case NewsAgencyName.머니투데이:
      newsAgencyURL = "http://www.mt.co.kr/";
      break;
    case NewsAgencyName.머니투데이방송:
      newsAgencyURL = "http://www.mtn.co.kr/";
      break;
    case NewsAgencyName.메트로신문:
      newsAgencyURL = "http://www.metroseoul.co.kr/";
      break;
    case NewsAgencyName.무등일보:
      newsAgencyURL = "http://www.honam.co.kr/";
      break;
    case NewsAgencyName.문화일보:
      newsAgencyURL = "http://www.munhwa.com/";
      break;
    case NewsAgencyName.미디어SR:
      newsAgencyURL = "http://www.mediasr.co.kr/";
      break;
    case NewsAgencyName.미디어오늘:
      newsAgencyURL = "http://www.mediatoday.co.kr/";
      break;
    case NewsAgencyName.미디어제주:
      newsAgencyURL = "http://www.mediajeju.com/";
      break;
    case NewsAgencyName.미디어펜:
      newsAgencyURL = "http://www.mediapen.com/";
      break;
    case NewsAgencyName.미주한국일보:
      newsAgencyURL = "http://www.koreatimes.com/";
      break;
    case NewsAgencyName.바이라인네트워크:
      newsAgencyURL = "https://byline.network/";
      break;
    case NewsAgencyName.법률방송뉴스:
      newsAgencyURL = "http://www.ltn.kr/";
      break;
    case NewsAgencyName.법률신문:
      newsAgencyURL = "http://www.lawtimes.co.kr/";
      break;
    case NewsAgencyName.베리타스알파:
      newsAgencyURL = "http://www.veritas-a.com/";
      break;
    case NewsAgencyName.보안뉴스:
      newsAgencyURL = "http://www.boannews.com/";
      break;
    case NewsAgencyName.부산일보:
      newsAgencyURL = "http://www.busan.com/";
      break;
    case NewsAgencyName.블로터:
      newsAgencyURL = "http://www.bloter.net/";
      break;
    case NewsAgencyName.비즈니스워치:
      newsAgencyURL = "http://www.bizwatch.co.kr/";
      break;
    case NewsAgencyName.비즈니스포스트:
      newsAgencyURL = "http://www.businesspost.co.kr/";
      break;
    case NewsAgencyName.비즈한국:
      newsAgencyURL = "http://www.bizhankook.com/";
      break;
    case NewsAgencyName.사이언스타임즈:
      newsAgencyURL = "http://www.sciencetimes.co.kr/";
      break;
    case NewsAgencyName.산업일보:
      newsAgencyURL = "http://www.kidd.co.kr/";
      break;
    case NewsAgencyName.서울경제:
      newsAgencyURL = "http://www.sedaily.com/";
      break;
    case NewsAgencyName.서울신문:
      newsAgencyURL = "http://www.seoul.co.kr/";
      break;
    case NewsAgencyName.서울파이낸스:
      newsAgencyURL = "http://www.seoulfn.com/";
      break;
    case NewsAgencyName.세계일보:
      newsAgencyURL = "http://www.segye.com/";
      break;
    case NewsAgencyName.소년한국일보:
      newsAgencyURL = "http://kids.hankooki.com/";
      break;
    case NewsAgencyName.소비자가만드는신문:
      newsAgencyURL = "http://www.consumernews.co.kr/";
      break;
    case NewsAgencyName.스타뉴스:
      newsAgencyURL = "http://star.mt.co.kr/";
      break;
    case NewsAgencyName.스포츠Q:
      newsAgencyURL = "http://www.sportsq.co.kr/";
      break;
    case NewsAgencyName.스포츠경향:
      newsAgencyURL = "http://sports.khan.co.kr/";
      break;
    case NewsAgencyName.스포츠동아:
      newsAgencyURL = "http://sports.donga.com/";
      break;
    case NewsAgencyName.스포츠서울:
      newsAgencyURL = "http://www.sportsseoul.com/";
      break;
    case NewsAgencyName.스포츠월드:
      newsAgencyURL = "http://www.sportsworldi.com/";
      break;
    case NewsAgencyName.스포츠조선:
      newsAgencyURL = "http://sports.chosun.com/";
      break;
    case NewsAgencyName.스포츠투데이:
      newsAgencyURL = "http://stoo.asiae.co.kr/";
      break;
    case NewsAgencyName.스포츠한국:
      newsAgencyURL = "http://sports.hankooki.com/";
      break;
    case NewsAgencyName.스포탈코리아:
      newsAgencyURL = "http://www.sportalkorea.com/";
      break;
    case NewsAgencyName.스포티비뉴스:
      newsAgencyURL = "http://www.spotvnews.co.kr/";
      break;
    case NewsAgencyName.시사오늘:
      newsAgencyURL = "http://www.sisaon.co.kr/";
      break;
    case NewsAgencyName.시사위크:
      newsAgencyURL = "http://www.sisaweek.com/";
      break;
    case NewsAgencyName.시사인:
      newsAgencyURL = "http://www.sisain.co.kr/";
      break;
    case NewsAgencyName.시사저널:
      newsAgencyURL = "http://www.sisapress.com/";
      break;
    case NewsAgencyName.시사저널이코노미:
      newsAgencyURL = "http://www.sisajournal-e.com/";
      break;
    case NewsAgencyName.신아일보:
      newsAgencyURL = "http://www.shinailbo.co.kr/";
      break;
    case NewsAgencyName.씨네21:
      newsAgencyURL = "http://www.cine21.com/";
      break;
    case NewsAgencyName.아리랑TV:
      newsAgencyURL = "http://www.arirang.co.kr/";
      break;
    case NewsAgencyName.아시아경제:
      newsAgencyURL = "http://www.asiae.co.kr/";
      break;
    case NewsAgencyName.아시아투데이:
      newsAgencyURL = "http://asiatoday.co.kr/";
      break;
    case NewsAgencyName.아이뉴스24:
      newsAgencyURL = "http://www.inews24.com/";
      break;
    case NewsAgencyName.아주경제:
      newsAgencyURL = "http://ajunews.com/";
      break;
    case NewsAgencyName.약사공론:
      newsAgencyURL = "http://www.kpanews.co.kr/";
      break;
    case NewsAgencyName.에너지경제:
      newsAgencyURL = "http://www.ekn.kr/";
      break;
    case NewsAgencyName.에이블뉴스:
      newsAgencyURL = "http://www.ablenews.co.kr/";
      break;
    case NewsAgencyName.엑스포츠뉴스:
      newsAgencyURL = "http://www.xportsnews.com/";
      break;
    case NewsAgencyName.엘르:
      newsAgencyURL = "http://www.elle.co.kr/";
      break;
    case NewsAgencyName.엠스플뉴스:
      newsAgencyURL = "http://www.mbcsportsplus.com/";
      break;
    case NewsAgencyName.여성신문:
      newsAgencyURL = "http://www.womennews.co.kr/";
      break;
    case NewsAgencyName.연합뉴스:
      newsAgencyURL = "http://www.yna.co.kr/";
      break;
    case NewsAgencyName.연합뉴스TV:
      newsAgencyURL = "http://www.yonhapnewstv.co.kr/";
      break;
    case NewsAgencyName.연합인포맥스:
      newsAgencyURL = "http://www.einfomax.co.kr/";
      break;
    case NewsAgencyName.영남일보:
      newsAgencyURL = "http://www.yeongnam.com/";
      break;
    case NewsAgencyName.오마이뉴스:
      newsAgencyURL = "http://www.ohmynews.com/";
      break;
    case NewsAgencyName.월간_산:
      newsAgencyURL = "http://san.chosun.com/";
      break;
    case NewsAgencyName.월간노동법률:
      newsAgencyURL = "http://www.worklaw.co.kr/";
      break;
    case NewsAgencyName.월간중앙:
      newsAgencyURL = "https://jmagazine.joins.com/monthly";
      break;
    case NewsAgencyName.위키리크스한국:
      newsAgencyURL = "http://www.wikileaks-kr.org/";
      break;
    case NewsAgencyName.위키트리:
      newsAgencyURL = "http://www.wikitree.co.kr/";
      break;
    case NewsAgencyName.이뉴스투데이:
      newsAgencyURL = "http://www.enewstoday.co.kr/";
      break;
    case NewsAgencyName.이데일리:
      newsAgencyURL = "http://www.edaily.co.kr/";
      break;
    case NewsAgencyName.이로운넷:
      newsAgencyURL = "http://www.eroun.net/";
      break;
    case NewsAgencyName.이웃집과학자:
      newsAgencyURL = "http://www.astronomer.rocks/";
      break;
    case NewsAgencyName.이코노미스트:
      newsAgencyURL = "http://jmagazine.joins.com/economist";
      break;
    case NewsAgencyName.이코노미조선:
      newsAgencyURL = "http://www.economychosun.com/";
      break;
    case NewsAgencyName.이코노믹리뷰:
      newsAgencyURL = "http://www.econovill.com/";
      break;
    case NewsAgencyName.이투데이:
      newsAgencyURL = "http://etoday.co.kr/";
      break;
    case NewsAgencyName.인더스트리뉴스:
      newsAgencyURL = "http://www.industrynews.co.kr/";
      break;
    case NewsAgencyName.인민망:
      newsAgencyURL = "http://kr.people.com.cn/";
      break;
    case NewsAgencyName.인벤:
      newsAgencyURL = "http://www.inven.co.kr/";
      break;
    case NewsAgencyName.인사이트코리아:
      newsAgencyURL = "http://www.insightkorea.co.kr/";
      break;
    case NewsAgencyName.인천일보:
      newsAgencyURL = "http://www.incheonilbo.com/";
      break;
    case NewsAgencyName.일간스포츠:
      newsAgencyURL = "http://isplus.joins.com/";
      break;
    case NewsAgencyName.일요시사:
      newsAgencyURL = "http://www.ilyosisa.co.kr/";
      break;
    case NewsAgencyName.일요신문:
      newsAgencyURL = "http://www.ilyo.co.kr/";
      break;
    case NewsAgencyName.자동차생활:
      newsAgencyURL = "http://news.carlife.net/";
      break;
    case NewsAgencyName.전기신문:
      newsAgencyURL = "http://www.electimes.com/";
      break;
    case NewsAgencyName.전남일보:
      newsAgencyURL = "http://www.jnilbo.com/";
      break;
    case NewsAgencyName.전북도민일보:
      newsAgencyURL = "http://www.domin.co.kr/";
      break;
    case NewsAgencyName.전북일보:
      newsAgencyURL = "http://www.jjan.kr/";
      break;
    case NewsAgencyName.전자신문:
      newsAgencyURL = "http://www.etnews.com/";
      break;
    case NewsAgencyName.정신의학신문:
      newsAgencyURL = "http://www.psychiatricnews.net/";
      break;
    case NewsAgencyName.제민일보:
      newsAgencyURL = "http://www.jemin.com/";
      break;
    case NewsAgencyName.제주도민일보:
      newsAgencyURL = "http://www.jejudomin.co.kr/";
      break;
    case NewsAgencyName.제주의소리:
      newsAgencyURL = "http://www.jejusori.net/";
      break;
    case NewsAgencyName.조선비즈:
      newsAgencyURL = "http://biz.chosun.com/";
      break;
    case NewsAgencyName.조선일보:
      newsAgencyURL = "http://www.chosun.com/";
      break;
    case NewsAgencyName.조세일보:
      newsAgencyURL = "http://www.joseilbo.com/";
      break;
    case NewsAgencyName.조이뉴스24:
      newsAgencyURL = "http://joynews.inews24.com/";
      break;
    case NewsAgencyName.주간조선:
      newsAgencyURL = "http://weekly.chosun.com/";
      break;
    case NewsAgencyName.중부매일:
      newsAgencyURL = "http://www.jbnews.com/";
      break;
    case NewsAgencyName.중부일보:
      newsAgencyURL = "http://www.joongboo.com/";
      break;
    case NewsAgencyName.중앙SUNDAY:
      newsAgencyURL = "https://news.joins.com/sunday";
      break;
    case NewsAgencyName.중앙데일리:
      newsAgencyURL = "http://koreajoongangdaily.joins.com/";
      break;
    case NewsAgencyName.중앙일보:
      newsAgencyURL = "http://joongang.joins.com/";
      break;
    case NewsAgencyName.지지통신:
      newsAgencyURL = "http://www.jiji.com/";
      break;
    case NewsAgencyName.채널A:
      newsAgencyURL = "http://www.ichannela.com/news/main/news_main.do";
      break;
    case NewsAgencyName.채널예스:
      newsAgencyURL = "http://ch.yes24.com/";
      break;
    case NewsAgencyName.철강금속신문:
      newsAgencyURL = "http://www.snmnews.com/";
      break;
    case NewsAgencyName.초이스경제:
      newsAgencyURL = "http://www.choicenews.co.kr/";
      break;
    case NewsAgencyName.충북일보:
      newsAgencyURL = "http://www.inews365.com/";
      break;
    case NewsAgencyName.충청일보:
      newsAgencyURL = "http://www.ccdailynews.com/";
      break;
    case NewsAgencyName.충청투데이:
      newsAgencyURL = "http://www.cctoday.co.kr/";
      break;
    case NewsAgencyName.컴퓨터월드:
      newsAgencyURL = "http://www.comworld.co.kr/";
      break;
    case NewsAgencyName.코리아쉬핑가제트:
      newsAgencyURL = "http://www.ksg.co.kr/";
      break;
    case NewsAgencyName.코리아타임스:
      newsAgencyURL = "http://www.koreatimes.co.kr/";
      break;
    case NewsAgencyName.코리아헤럴드:
      newsAgencyURL = "http://www.koreaherald.com/";
      break;
    case NewsAgencyName.코메디닷컴:
      newsAgencyURL = "http://www.kormedi.com/";
      break;
    case NewsAgencyName.쿠키뉴스:
      newsAgencyURL = "http://www.kukinews.com/";
      break;
    case NewsAgencyName.텐아시아:
      newsAgencyURL = "http://tenasia.hankyung.com/";
      break;
    case NewsAgencyName.톱데일리:
      newsAgencyURL = "http://www.topdaily.kr/";
      break;
    case NewsAgencyName.투데이신문:
      newsAgencyURL = "http://www.ntoday.co.kr/";
      break;
    case NewsAgencyName.티브이데일리:
      newsAgencyURL = "http://tvdaily.asiae.co.kr/";
      break;
    case NewsAgencyName.파이낸셜뉴스:
      newsAgencyURL = "http://www.fnnews.com/";
      break;
    case NewsAgencyName.포브스코리아:
      newsAgencyURL = "https://jmagazine.joins.com/forbes";
      break;
    case NewsAgencyName.프라임경제:
      newsAgencyURL = "http://www.newsprime.co.kr/";
      break;
    case NewsAgencyName.프레시안:
      newsAgencyURL = "http://www.pressian.com/";
      break;
    case NewsAgencyName.한겨레:
      newsAgencyURL = "http://www.hani.co.kr/";
      break;
    case NewsAgencyName.한겨레21:
      newsAgencyURL = "http://h21.hani.co.kr/";
      break;
    case NewsAgencyName.한경비즈니스:
      newsAgencyURL = "http://www.kbizweek.com/";
      break;
    case NewsAgencyName.한경잡앤조이:
      newsAgencyURL = "http://www.jobnjoy.com/";
      break;
    case NewsAgencyName.한국경제:
      newsAgencyURL = "http://www.hankyung.com/";
      break;
    case NewsAgencyName.한국경제TV:
      newsAgencyURL = "http://www.wowtv.co.kr/";
      break;
    case NewsAgencyName.한국금융신문:
      newsAgencyURL = "http://www.fntimes.com/";
      break;
    case NewsAgencyName.한국농어촌방송:
      newsAgencyURL = "http://www.newskr.kr/";
      break;
    case NewsAgencyName.한국대학신문:
      newsAgencyURL = "http://www.unn.net/";
      break;
    case NewsAgencyName.한국일보:
      newsAgencyURL = "http://www.hankookilbo.com/";
      break;
    case NewsAgencyName.허프포스트코리아:
      newsAgencyURL = "http://www.huffingtonpost.kr/";
      break;
    case NewsAgencyName.헤럴드경제:
      newsAgencyURL = "http://www.heraldbiz.com/";
      break;
    case NewsAgencyName.헬로디디:
      newsAgencyURL = "http://www.hellodd.com/";
      break;
    case NewsAgencyName.헬스조선:
      newsAgencyURL = "http://health.chosun.com/";
      break;
    default:
      newsAgencyURL = null;
  }

  return newsAgencyURL;
}
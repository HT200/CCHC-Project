  // Logo carousels now use pure CSS marquee animation — no JS needed

  // ===== Measure sticky header height so anchor scrolling isn't hidden underneath it =====
  (function(){
    var root = document.documentElement;
    var header;
    function stuckHeight(el){
      if(!el) return 0;
      var cs = getComputedStyle(el);
      if(cs.display === 'none') return 0;
      return (parseFloat(cs.top) || 0) + el.offsetHeight;
    }
    function measure(){
      root.style.setProperty('--snap-header-h', stuckHeight(header) + 'px');
    }
    function init(){
      header = document.querySelector('header');
      measure();
      window.addEventListener('resize', measure);
      window.addEventListener('orientationchange', measure);
    }
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  })();

  // ===== SPA navigation with back stack =====
  var navStack = ['home'];
  var soonData = {
    'nghien-cuu':{t:'Nghiên cứu &amp; Dữ liệu',m:'Chuyên trang Nghiên cứu &amp; Dữ liệu đang được xây dựng — bạn vẫn có thể gửi đề xuất ngay.',cta:'Gửi đề xuất nghiên cứu',fn:function(){go('form','Đề xuất nghiên cứu / hợp tác','to-chuc')}},
    'doi-tac':{t:'Đối tác &amp; Hợp tác',m:'Chuyên trang Đối tác &amp; Hợp tác đang được xây dựng — bạn vẫn có thể liên hệ hợp tác ngay.',cta:'Liên hệ hợp tác',fn:function(){go('lien-he')}},
    'dao-tao':{t:'Đào tạo',m:'Chuyên trang Đào tạo đang được xây dựng — đăng ký quan tâm để nhận thông tin khóa sớm nhất.',cta:'Đăng ký quan tâm',fn:function(){go('form','Đăng ký bản tin &amp; sự kiện cộng đồng','ca-nhan')}}
  };

  function show(id){
    var pages = document.querySelectorAll('.page');
    for(var i=0;i<pages.length;i++) pages[i].classList.remove('on');
    var el = document.getElementById('page-'+id);
    if(el) el.classList.add('on');
    window.scrollTo(0,0);
    // Một điểm search mỗi màn: trang chủ dùng ô hero, ẩn icon search header
    document.body.classList.toggle('is-home', id==='home');
    document.documentElement.classList.toggle('is-home', id==='home');
    // nav active state (best-effort)
    var links = document.querySelectorAll('nav.main a');
    for(var j=0;j<links.length;j++) links[j].classList.remove('active');
  }

  // go(page, arg1, arg2)
  function go(id, a, b){
    // close mobile menu + search overlay
    closeMenu();
    var so=document.getElementById('searchOverlay');
    if(so){so.classList.remove('open');}
    closeMap();

    if(id==='form'){
      var title = a || 'Biểu mẫu';
      document.getElementById('formTitle').innerHTML = title;
      document.getElementById('formCrumb').innerHTML = title;
      setToggle(b || 'ca-nhan');
    }
    if(id==='soon'){
      // a = title fallback, b = key
      var key = b;
      var d = soonData[key];
      if(d){
        document.getElementById('soonTitle').innerHTML = 'Chuyên trang ' + d.t;
        document.getElementById('soonMsg').innerHTML = d.m;
        var cta = document.getElementById('soonCta');
        cta.innerHTML = d.cta;
        cta.onclick = d.fn;
      } else {
        document.getElementById('soonTitle').innerHTML = a || 'Sắp ra mắt';
      }
    }
    if(id==='hoi-ck'){
      document.getElementById('hoiTitle').innerHTML = a || 'Hội chuyên khoa';
      document.getElementById('hoiDesc').innerHTML = b || '';
    }
    if(id==='expert'){ fillExpert(a || 'na'); }
    if(id==='chu-de'){ fillTopic(a || 'tang-huyet-ap'); }
    if(id==='tin'){ fillNews(a || 'tha-nguoi-tre'); }
    if(id==='su-kien'){ fillEvent(a || 'dtd'); }
    // Cuộn tới mỏ neo trong trang đích: go(page, '#anchorId')
    if(typeof a==='string' && a.charAt(0)==='#'){
      show(id);
      navStack.push(id);
      var anchorId=a.slice(1);
      setTimeout(function(){var e=document.getElementById(anchorId);if(e)e.scrollIntoView({behavior:'smooth'});},60);
      return;
    }
    navStack.push(id);
    show(id);
  }

  function back(){
    if(navStack.length>1){
      navStack.pop();
      show(navStack[navStack.length-1]);
    } else {
      show('home');
    }
  }

  function toggleMenu(){
    if(document.getElementById('mainnav').classList.contains('open')) closeMenu();
    else openMenu();
  }
  function openMenu(){
    document.getElementById('mainnav').classList.add('open');
    document.getElementById('navBackdrop').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu(){
    document.getElementById('mainnav').classList.remove('open');
    document.getElementById('navBackdrop').classList.remove('open');
    document.body.style.overflow = '';
  }
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeMenu();
  });

  // ===== Form toggle Cá nhân / Tổ chức =====
  function setToggle(mode){
    var cn = document.getElementById('tgCn'), tc = document.getElementById('tgTc');
    var org = document.getElementById('fldOrg');
    if(mode==='to-chuc'){
      tc.classList.add('on'); cn.classList.remove('on'); org.style.display='block';
    } else {
      cn.classList.add('on'); tc.classList.remove('on'); org.style.display='none';
    }
  }

  function submitForm(e){
    e.preventDefault();
    var c = document.getElementById('consent');
    var err = document.getElementById('consentErr');
    if(!c.checked){ err.style.display='block'; return false; }
    err.style.display='none';
    go('cam-on');
    return false;
  }

  // ===== Article filters =====
  var curTopic='all', curM='all';
  function applyFilters(){
    var cards = document.querySelectorAll('#articleGrid .card');
    var shown=0;
    for(var i=0;i<cards.length;i++){
      var okT = (curTopic==='all' || cards[i].getAttribute('data-topic')===curTopic);
      var okM = (curM==='all' || cards[i].getAttribute('data-m')===curM);
      if(okT&&okM){cards[i].style.display='flex';shown++;} else {cards[i].style.display='none';}
    }
    document.getElementById('artEmpty').style.display = shown? 'none':'block';
  }
  function filterTopic(el,v){
    curTopic=v;
    var sib=el.parentNode.querySelectorAll('.fchip');
    // clear only topic group (first group up to divider) — simple: toggle within siblings before divider
    setChipGroup(el);
    applyFilters();
  }
  function filterM(el,v){
    curM=v; setChipGroup(el); applyFilters();
  }
  function setChipGroup(el){
    // find the contiguous group of .fchip immediately around el separated by non-chip spacers
    var group=[], node=el;
    // walk back
    var p=el.previousElementSibling;
    while(p && p.classList && p.classList.contains('fchip')){group.push(p);p=p.previousElementSibling;}
    var n=el.nextElementSibling;
    while(n && n.classList && n.classList.contains('fchip')){group.push(n);n=n.nextElementSibling;}
    group.push(el);
    for(var i=0;i<group.length;i++) group[i].classList.remove('on');
    el.classList.add('on');
  }
  function resetFilters(){
    curTopic='all';curM='all';
    var chips=document.querySelectorAll('.filterbar .fchip');
    // re-set the "Tất cả" ones
    applyFilters();
    // visually reset: activate first chip of each group
    location.hash='';
    var all=document.querySelectorAll('#page-tri-thuc .fchip');
    // crude: turn all off then on the two "Tất cả"
    for(var i=0;i<all.length;i++) all[i].classList.remove('on');
    all[0].classList.add('on'); // topic Tất cả
    // find M "Tất cả": it's the chip after divider labelled Tất cả -> index of first M group
    for(var j=0;j<all.length;j++){ if(all[j].textContent.trim()==='Tất cả'){ all[j].classList.add('on'); } }
  }

  // ===== Expert filters =====
  function filterExpert(v, el){
    var chips = el.parentNode.querySelectorAll('.fchip');
    for(var i=0;i<chips.length;i++) chips[i].classList.remove('on');
    el.classList.add('on');
    var cards = document.querySelectorAll('#expertGrid .expert-card');
    var shown=0;
    for(var j=0;j<cards.length;j++){
      var ok;
      if(v==='all') ok=true;
      else if(v==='phong-van') ok=(cards[j].getAttribute('data-pv')==='1');
      else ok=(cards[j].getAttribute('data-spec')===v);
      if(ok){cards[j].style.display='flex';shown++;} else {cards[j].style.display='none';}
    }
    document.getElementById('expertEmpty').style.display = shown? 'none':'block';
  }

  // ===== Expert profile data (dynamic) =====
  var expertData={
    na:{init:'NA',photo:'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&auto=format',name:'PGS.TS Nguyễn Văn An',sub:'Chuyên khoa Tim mạch · Hội Tim mạch học Việt Nam · Nhận phỏng vấn báo chí',hoc:'Phó Giáo sư, Tiến sĩ Y học, chuyên ngành Tim mạch. Công tác tại một cơ sở y tế minh hoạ; thành viên hội đồng khoa học của một số hội chuyên khoa.',arts:[['Tăng huyết áp ở người trẻ: những dấu hiệu dễ bỏ qua','article','m1'],['Nhận biết sớm dấu hiệu đột quỵ theo quy tắc F.A.S.T','article-dotquy','m2']]},
    lb:{init:'LB',photo:'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&auto=format',name:'TS.BS Lê Thị Bình',sub:'Chuyên khoa Nội tiết · Hội Nội tiết – Đái tháo đường Việt Nam · Nhận phỏng vấn báo chí',hoc:'Tiến sĩ, Bác sĩ chuyên khoa Nội tiết. Công tác tại một cơ sở y tế minh hoạ.',arts:[['Tầm soát đái tháo đường típ 2: ai cần làm và khi nào','article-dtd','m1'],['BMI nói lên điều gì và không nói điều gì?','article-bmi','m4']]},
    td:{init:'TĐ',photo:'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&auto=format',name:'BS.CKII Trần Minh Đức',sub:'Chuyên khoa Y học dự phòng · Hội Y học Dự phòng Việt Nam',hoc:'Bác sĩ chuyên khoa II, Y học dự phòng. Công tác tại một cơ sở y tế minh hoạ.',arts:[['Người lớn có cần tiêm chủng không? Những mũi hay bị quên','article-tiemchung','m2'],['Bệnh không lây nhiễm là gì và phòng ngừa thế nào?','article-bknly','m2']]},
    qh:{init:'QH',photo:'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&auto=format',name:'GS.TS Phạm Quốc Hùng',sub:'Chuyên khoa Tim mạch · Hội Tim mạch học Việt Nam · Nhận phỏng vấn báo chí',hoc:'Giáo sư, Tiến sĩ Y học, chuyên ngành Tim mạch. Công tác tại một cơ sở y tế minh hoạ.',arts:[['Tăng huyết áp ở người trẻ: những dấu hiệu dễ bỏ qua','article','m1'],['Ăn giảm muối thế nào cho đúng trong bữa cơm Việt?','article-giammuoi','m3']]},
    dm:{init:'ĐM',photo:'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&auto=format',name:'TS.BS Đỗ Thị Mai',sub:'Chuyên khoa Nội tiết · Hội Nội tiết – Đái tháo đường Việt Nam · Nhận phỏng vấn báo chí',hoc:'Tiến sĩ, Bác sĩ chuyên khoa Nội tiết. Công tác tại một cơ sở y tế minh hoạ.',arts:[['Tầm soát đái tháo đường típ 2: ai cần làm và khi nào','article-dtd','m1'],['BMI nói lên điều gì và không nói điều gì?','article-bmi','m4']]},
    vn:{init:'VN',photo:'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=200&h=200&fit=crop&auto=format',name:'BS.CKI Vũ Hoàng Nam',sub:'Chuyên khoa Y học dự phòng · Hội Y học Dự phòng Việt Nam',hoc:'Bác sĩ chuyên khoa I, Y học dự phòng, quan tâm lĩnh vực sức khỏe cộng đồng. Công tác tại một cơ sở y tế minh hoạ.',arts:[['Người lớn có cần tiêm chủng không? Những mũi hay bị quên','article-tiemchung','m2'],['Căng thẳng kéo dài ảnh hưởng đến sức khỏe như thế nào?','article-tamthan','m3']]},
    lh:{init:'LH',photo:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&auto=format',name:'PGS.TS Lê Quang Huy',sub:'Chuyên khoa Tim mạch · Hội Tim mạch học Việt Nam',hoc:'Phó Giáo sư, Tiến sĩ Y học, chuyên ngành Tim mạch. Công tác tại một cơ sở y tế minh hoạ.',arts:[['Tăng huyết áp ở người trẻ: những dấu hiệu dễ bỏ qua','article','m1'],['Nhận biết sớm dấu hiệu đột quỵ theo quy tắc F.A.S.T','article-dotquy','m2']]},
    nl:{init:'NL',photo:'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&auto=format',name:'ThS.BS Nguyễn Thị Lan',sub:'Chuyên khoa Nội tiết · Hội Nội tiết – Đái tháo đường Việt Nam · Nhận phỏng vấn báo chí',hoc:'Thạc sĩ, Bác sĩ chuyên khoa Nội tiết. Công tác tại một cơ sở y tế minh hoạ.',arts:[['Tầm soát đái tháo đường típ 2: ai cần làm và khi nào','article-dtd','m1'],['Ăn giảm muối thế nào cho đúng trong bữa cơm Việt?','article-giammuoi','m3']]},
    hs:{init:'HS',photo:'https://images.unsplash.com/photo-1550831107-1553da8c8464?w=200&h=200&fit=crop&auto=format',name:'BS.CKII Hoàng Văn Sơn',sub:'Chuyên khoa Y học dự phòng · Hội Y học Dự phòng Việt Nam · Nhận phỏng vấn báo chí',hoc:'Bác sĩ chuyên khoa II, Y học dự phòng. Công tác tại một cơ sở y tế minh hoạ.',arts:[['Ngủ bao nhiêu là đủ và làm sao để ngủ ngon hơn?','article-giacngu','m3'],['Sơ cấp cứu cơ bản: vài kỹ năng ai cũng nên biết','article-socapcuu','m2']]}
  };
  function fillExpert(k){
    var d=expertData[k]||expertData.na;
    document.getElementById('exAvIni').textContent=d.init;
    var exIm=document.getElementById('exAvImg');
    if(d.photo){exIm.style.display='block';exIm.src=d.photo;}else{exIm.style.display='none';}
    document.getElementById('exName').textContent=d.name;
    document.getElementById('exSub').textContent=d.sub;
    document.getElementById('exHoc').textContent=d.hoc;
    var h='';
    for(var i=0;i<d.arts.length;i++){
      var a=d.arts[i];
      h+='<li><a onclick="go(\''+a[1]+'\')">'+a[0]+'</a> <span class="mlabel '+a[2]+'" style="font-size:.78rem">'+a[2].toUpperCase()+'</span></li>';
    }
    h+='<li><span class="muted">Danh sách tự cập nhật khi có bài mới được thẩm định.</span></li>';
    document.getElementById('exArts').innerHTML=h;
  }

  // ===== v8: Hồ sơ chủ đề (Topic Hub · động) =====
  var topicData={
    'tang-huyet-ap':{
      name:'Tăng huyết áp', m:'m1', mlabel:'M1 · Bằng chứng mạnh',
      sum:'Tăng huyết áp thường không có triệu chứng rõ nhưng làm tăng nguy cơ đột quỵ, nhồi máu cơ tim và bệnh thận. Hồ sơ này gom bài nền, video, hỏi–đáp và chuyên gia quanh chủ đề để bạn hiểu đúng và biết khi nào cần đi khám.',
      arts:[['article','Tăng huyết áp ở người trẻ: những dấu hiệu dễ bỏ qua','m1','M1'],['article-giammuoi','Ăn giảm muối thế nào cho đúng trong bữa cơm Việt?','m3','M3'],['article-bknly','Bệnh không lây nhiễm là gì và phòng ngừa thế nào?','m2','M2']],
      experts:['na','qh'],
      events:[['12','Th8','Tọa đàm: Sống khỏe cùng bệnh tim mạch &amp; huyết áp','Trực tuyến · Hội Tim mạch học Việt Nam'],['09','Th9','Diễn đàn chuyên gia: Cập nhật hướng dẫn kiểm soát huyết áp','Trực tuyến · Có cấp tài liệu sau sự kiện']]
    },
    'dai-thao-duong':{
      name:'Đái tháo đường', m:'m1', mlabel:'M1 · Bằng chứng mạnh',
      sum:'Đái tháo đường típ 2 tiến triển âm thầm nhiều năm trước khi được phát hiện. Hồ sơ này tập hợp bài nền về tầm soát, dinh dưỡng, video và chuyên gia để bạn chủ động phòng ngừa và kiểm soát.',
      arts:[['article-dtd','Tầm soát đái tháo đường típ 2: ai cần làm và khi nào','m1','M1'],['article-giammuoi','Ăn giảm muối thế nào cho đúng trong bữa cơm Việt?','m3','M3'],['article-bmi','BMI nói lên điều gì và không nói điều gì?','m4','M4']],
      experts:['lb','dm'],
      events:[['12','Th8','Tọa đàm: Sống khỏe cùng bệnh đái tháo đường','Trực tuyến · Hội Nội tiết &amp; ĐTĐ Việt Nam']]
    },
    'dot-quy':{
      name:'Đột quỵ', m:'m2', mlabel:'M2 · Bằng chứng khá',
      sum:'Đột quỵ có thể xảy ra đột ngột; nhận biết sớm theo quy tắc F.A.S.T và gọi cấp cứu kịp thời giúp giảm di chứng. Hồ sơ này gom bài nền, video, hỏi–đáp và chuyên gia của chủ đề.',
      arts:[['article-dotquy','Nhận biết sớm dấu hiệu đột quỵ theo quy tắc F.A.S.T','m2','M2'],['article','Tăng huyết áp ở người trẻ: những dấu hiệu dễ bỏ qua','m1','M1'],['article-bknly','Bệnh không lây nhiễm là gì và phòng ngừa thế nào?','m2','M2']],
      experts:['na','qh'],
      events:[['09','Th9','Diễn đàn chuyên gia: Cập nhật hướng dẫn phòng đột quỵ','Trực tuyến · Có cấp tài liệu sau sự kiện']]
    }
  };
  function fillTopic(k){
    var d=topicData[k]||topicData['tang-huyet-ap'];
    document.getElementById('chdCrumb').textContent=d.name;
    document.getElementById('chdTitle').textContent='Hồ sơ chủ đề: '+d.name;
    var m=document.getElementById('chdM'); m.className='mlabel '+d.m; m.textContent=d.mlabel;
    document.getElementById('chdSum').textContent=d.sum;
    var ah='';
    for(var i=0;i<d.arts.length;i++){var a=d.arts[i];
      ah+='<div class="card click" onclick="go(\''+a[0]+'\')"><span class="mlabel '+a[2]+'">'+a[3]+'</span><h3 style="margin-top:10px">'+a[1]+'</h3><span class="cta">Đọc bài →</span></div>';
    }
    document.getElementById('chdArts').innerHTML=ah;
    var eh='';
    for(var j=0;j<d.experts.length;j++){var ex=expertData[d.experts[j]];
      eh+='<div class="card click" onclick="go(\'expert\',\''+d.experts[j]+'\')"><div style="display:flex;gap:12px;align-items:center"><div class="avatar">'+ex.init+'<img src="'+ex.photo+'" alt="Ảnh chân dung minh hoạ" onerror="this.style.display=\'none\'"></div><div><h3 style="margin:0">'+ex.name+'</h3><span class="muted" style="font-size:.85rem">'+ex.sub+'</span></div></div><span class="cta">Xem hồ sơ →</span></div>';
    }
    document.getElementById('chdExperts').innerHTML=eh;
    var vh='';
    for(var q=0;q<d.events.length;q++){var ev=d.events[q];
      vh+='<div class="event-row"><div class="event-date"><b>'+ev[0]+'</b><span>'+ev[1]+'</span></div><div style="flex:1"><h3 style="margin:0">'+ev[2]+'</h3><span class="muted" style="font-size:.86rem">'+ev[3]+'</span></div><button class="btn sec sm" onclick="go(\'form\',\'Đăng ký sự kiện cộng đồng\',\'ca-nhan\')">Đăng ký</button></div>';
    }
    document.getElementById('chdEvents').innerHTML=vh;
  }

  // ===== v8: Tin (tách khỏi bài · động) =====
  var newsData={
    'tha-nguoi-tre':{title:'Tăng huyết áp ở người trẻ: những dấu hiệu dễ bỏ qua', date:'18/07/2026', source:'CCHC', topic:['tang-huyet-ap','Hồ sơ chủ đề Tăng huyết áp'], expert:['na','PGS.TS Nguyễn Văn An'], funding:true,
      paras:['CCHC phối hợp chuyên gia Hội Tim mạch học Việt Nam thực hiện chuỗi nội dung truyền thông về nhận biết sớm tăng huyết áp ở người trẻ — nhóm thường chủ quan vì bệnh ít triệu chứng ở giai đoạn đầu.','Nội dung nhấn mạnh việc đo huyết áp định kỳ, ghi lại chỉ số ở nhiều thời điểm và trao đổi với bác sĩ khi có bất thường. Bản tin dẫn về bài nền đã thẩm định để bạn đọc tìm hiểu sâu hơn.','Đây là nội dung minh hoạ trong bản demo, không phản ánh một sự kiện có thật.']},
    'toa-dam-dot-quy':{title:'CCHC phối hợp Tổng hội tổ chức tọa đàm phòng chống đột quỵ', date:'20/07/2026', source:'Tổng hội Y học Việt Nam', topic:['dot-quy','Hồ sơ chủ đề Đột quỵ'], expert:['na','PGS.TS Nguyễn Văn An'], funding:false,
      paras:['CCHC phối hợp cùng Tổng hội Y học Việt Nam và các chuyên gia thần kinh – tim mạch tổ chức tọa đàm cộng đồng về nhận biết sớm và xử trí đột quỵ theo quy tắc F.A.S.T.','Tọa đàm cung cấp tài liệu tóm tắt và giải đáp các câu hỏi thường gặp của người dân. Bản tin dẫn về hồ sơ chủ đề và chuyên gia phản biện để tra cứu tiếp.','Đây là nội dung minh hoạ trong bản demo, không phản ánh một sự kiện có thật.']},
    'kham-suc-khoe-dinh-ky':{title:'Giải mã quy định mới về khám sức khỏe định kỳ', date:'12/07/2026', source:'CCHC', topic:['tang-huyet-ap','Hồ sơ chủ đề Tăng huyết áp'], expert:['qh','GS.TS Phạm Quốc Hùng'], funding:false,
      paras:['CCHC diễn giải nội dung một quy định về khám sức khỏe định kỳ thành ngôn ngữ dễ hiểu cho người lao động — trung lập, trích đúng số hiệu và kèm liên kết văn bản gốc (minh hoạ).','Bản tin tách phần đưa tin khỏi phần tri thức nền: bạn đọc muốn tìm hiểu chuyên sâu được dẫn sang hồ sơ chủ đề và văn bản gốc.','Đây là nội dung minh hoạ trong bản demo, không phản ánh một văn bản pháp lý có thật.']},
    'tam-soat-dtd':{title:'Phối hợp Hội Nội tiết – ĐTĐ Việt Nam chuyển tải nội dung tầm soát đái tháo đường', date:'15/07/2026', source:'Tổng hội Y học Việt Nam', topic:['dai-thao-duong','Hồ sơ chủ đề Đái tháo đường'], expert:['lb','TS.BS Lê Thị Bình'], funding:false,
      paras:['CCHC phối hợp Hội Nội tiết – Đái tháo đường Việt Nam biên tập khuyến cáo tầm soát đái tháo đường típ 2 thành nội dung cộng đồng dễ tiếp cận.','Nội dung nêu rõ ai nên tầm soát, khi nào và bằng xét nghiệm gì, đồng thời dẫn về bài nền đã thẩm định và chuyên gia phản biện.','Đây là nội dung minh hoạ trong bản demo, không phản ánh một sự kiện có thật.']},
    'tiem-chung-he':{title:'Thông cáo: Chiến dịch truyền thông tiêm chủng mùa hè 2026', date:'02/07/2026', source:'CCHC', topic:['tri-thuc','Thư viện tri thức — chủ đề Tiêm chủng'], expert:['td','BS.CKII Trần Minh Đức'], funding:true,
      paras:['CCHC phát hành thông cáo về chiến dịch truyền thông nhắc lịch tiêm chủng cho người lớn trong mùa hè 2026, tập trung vào các mũi hay bị bỏ quên.','Tài liệu thông cáo có thể tải mà không cần đăng nhập. Bản tin dẫn về chuyên gia phản biện và chính sách tài trợ để bảo đảm minh bạch.','Đây là nội dung minh hoạ trong bản demo, không phản ánh một chiến dịch có thật.']},
    'bknly':{title:'CCHC phối hợp truyền thông phòng chống bệnh không lây nhiễm', date:'12/07/2026', source:'Tổng hội Y học Việt Nam', topic:['tang-huyet-ap','Hồ sơ chủ đề Tăng huyết áp'], expert:['td','BS.CKII Trần Minh Đức'], funding:false,
      paras:['CCHC phối hợp Tổng hội Y học Việt Nam triển khai chuỗi nội dung truyền thông phòng chống bệnh không lây nhiễm — nhóm bệnh chiếm phần lớn gánh nặng tử vong nhưng phần lớn phòng ngừa được.','Nội dung tập trung vào bốn yếu tố nguy cơ chính và cách phòng ngừa từ những thay đổi nhỏ trong lối sống.','Đây là nội dung minh hoạ trong bản demo, không phản ánh một sự kiện có thật.']},
    'tam-than':{title:'Chuỗi nội dung chăm sóc sức khỏe tâm thần cộng đồng', date:'08/07/2026', source:'CCHC', topic:['tri-thuc','Thư viện tri thức — chủ đề Sức khỏe tâm thần'], expert:['vn','BS.CKI Vũ Hoàng Nam'], funding:false,
      paras:['CCHC thực hiện chuỗi nội dung về chăm sóc sức khỏe tâm thần cộng đồng, nhấn mạnh rằng tìm hỗ trợ là điều nên làm, không phải điểm yếu.','Nội dung hướng dẫn nhận biết một số dấu hiệu nên chú ý và cách tìm trợ giúp phù hợp, đồng thời dẫn về chuyên gia phản biện.','Đây là nội dung minh hoạ trong bản demo, không phản ánh một sự kiện có thật.']}
  };
  function fillNews(k){
    var d=newsData[k]||newsData['tha-nguoi-tre'];
    document.getElementById('tinCrumb').textContent=d.title;
    document.getElementById('tinTitle').textContent=d.title;
    document.getElementById('tinSourcePill').textContent='Nguồn: '+d.source;
    document.getElementById('tinMeta').innerHTML='<b>Ngày đăng:</b> '+d.date+' · <b>Nguồn:</b> '+d.source;
    var b='';
    for(var i=0;i<d.paras.length;i++) b+='<p>'+d.paras[i]+'</p>';
    document.getElementById('tinBody').innerHTML=b;
    var topicFn=(d.topic[0]==='tri-thuc')?"go('tri-thuc')":"go('chu-de','"+d.topic[0]+"')";
    var cells=[
      {label:'Hồ sơ chủ đề liên quan', sub:d.topic[1], fn:topicFn},
      {label:'Chuyên gia phản biện', sub:d.expert[1], fn:"go('expert','"+d.expert[0]+"')"},
      {label:'Sự kiện liên quan', sub:'Lịch sự kiện &amp; tọa đàm cộng đồng', fn:"go('tin-tuc-su-kien')"},
      {label:'Công khai tài trợ', sub:(d.funding?'Nội dung có tài trợ — xem chính sách':'Chính sách tài trợ công khai'), fn:"go('chinh-sach-tai-tro')"},
      {label:'Nguồn', sub:'Nguồn tham khảo &amp; chính sách biên tập (minh hoạ)', fn:"go('minh-bach','#bientap')"}
    ];
    var h='';
    for(var j=0;j<cells.length;j++){h+='<a class="linkweb-cell" onclick="'+cells[j].fn+'"><b>'+cells[j].label+'</b><span>'+cells[j].sub+'</span></a>';}
    document.getElementById('tinLinks').innerHTML=h;
  }

  // ===== v17: Chi tiết sự kiện (động · fillEvent) =====
  var eventData={
    'dtd':{title:'Tọa đàm: Sống khỏe cùng bệnh đái tháo đường', type:'Tọa đàm cộng đồng', date:'12/08/2026', place:'Trực tuyến · Hội Nội tiết – ĐTĐ Việt Nam',
      desc:'Tọa đàm chia sẻ cách sống khỏe cùng đái tháo đường típ 2: dinh dưỡng, vận động, theo dõi đường huyết và khi nào cần đi khám. Có phần hỏi–đáp với chuyên gia.',
      speakers:[['lb','TS.BS Lê Thị Bình'],['dm','TS.BS Đỗ Thị Mai']], topic:['dai-thao-duong','Hồ sơ chủ đề Đái tháo đường'], funding:false},
    'baochi':{title:'Hội thảo báo chí: Truyền thông y tế có trách nhiệm', type:'Hội thảo', date:'27/08/2026', place:'Hà Nội',
      desc:'Hội thảo dành cho phóng viên, biên tập viên về nguyên tắc đưa tin y tế chính xác, tránh giật gân và dẫn nguồn đúng. Có cấp tài liệu và media kit sau sự kiện.',
      speakers:[['qh','GS.TS Phạm Quốc Hùng'],['hs','BS.CKII Hoàng Văn Sơn']], topic:['tri-thuc','Thư viện tri thức'], funding:false},
    'dotquy':{title:'Diễn đàn chuyên gia: Cập nhật hướng dẫn phòng đột quỵ', type:'Diễn đàn chuyên gia', date:'09/09/2026', place:'Trực tuyến · Có cấp tài liệu sau sự kiện',
      desc:'Diễn đàn cập nhật hướng dẫn phòng ngừa và nhận biết sớm đột quỵ theo quy tắc F.A.S.T, dành cho chuyên gia và người quan tâm. Có tài liệu tải sau sự kiện.',
      speakers:[['na','PGS.TS Nguyễn Văn An'],['lh','PGS.TS Lê Quang Huy']], topic:['dot-quy','Hồ sơ chủ đề Đột quỵ'], funding:true},
    'recap-tha':{title:'Hội thảo phòng chống tăng huyết áp cộng đồng (06/2026)', type:'Recap sự kiện', date:'06/2026', place:'Đã diễn ra · phối hợp chuyên gia tim mạch',
      desc:'Chương trình truyền thông sức khỏe cộng đồng về nhận biết và kiểm soát tăng huyết áp. Kèm báo cáo kết quả truyền thông và tài liệu tóm tắt.',
      speakers:[['na','PGS.TS Nguyễn Văn An'],['qh','GS.TS Phạm Quốc Hùng']], topic:['tang-huyet-ap','Hồ sơ chủ đề Tăng huyết áp'], funding:true},
    'recap-dotquy':{title:'Diễn đàn phòng chống đột quỵ cộng đồng (05/2026)', type:'Recap sự kiện', date:'05/2026', place:'Đã diễn ra · phối hợp Tổng hội',
      desc:'Chia sẻ cách nhận biết sớm và xử trí đột quỵ theo quy tắc F.A.S.T. Kèm tài liệu tóm tắt và bài viết liên quan.',
      speakers:[['na','PGS.TS Nguyễn Văn An'],['lh','PGS.TS Lê Quang Huy']], topic:['dot-quy','Hồ sơ chủ đề Đột quỵ'], funding:false}
  };
  function fillEvent(k){
    var d=eventData[k]||eventData['dtd'];
    document.getElementById('skCrumb').textContent=d.title;
    document.getElementById('skType').textContent=d.type;
    document.getElementById('skTitle').textContent=d.title;
    document.getElementById('skMeta').innerHTML='<b>Ngày:</b> '+d.date+' · <b>Địa điểm:</b> '+d.place;
    document.getElementById('skDesc').textContent=d.desc;
    var sh='';
    for(var i=0;i<d.speakers.length;i++){var ex=expertData[d.speakers[i][0]];
      sh+='<div class="card click" onclick="go(\'expert\',\''+d.speakers[i][0]+'\')"><div style="display:flex;gap:12px;align-items:center"><div class="avatar">'+ex.init+'<img src="'+ex.photo+'" alt="Ảnh chân dung minh hoạ" onerror="this.style.display=\'none\'"></div><div><h3 style="margin:0">'+ex.name+'</h3><span class="muted" style="font-size:.85rem">Diễn giả · '+ex.sub.split(' · ')[0]+'</span></div></div><span class="cta">Xem hồ sơ chuyên gia →</span></div>';
    }
    document.getElementById('skSpeakers').innerHTML=sh;
    document.getElementById('skTopic').innerHTML='<a onclick="go(\'chu-de\',\''+d.topic[0]+'\')">'+d.topic[1]+' →</a>';
    var cells=[
      {label:'Tài liệu sau sự kiện', sub:'Tải tài liệu tóm tắt (minh hoạ)', fn:"alert('Demo: tải tài liệu sau sự kiện (mô phỏng)')"},
      {label:'Công khai tài trợ', sub:(d.funding?'Sự kiện có tài trợ — xem chính sách':'Chính sách tài trợ công khai'), fn:"go('chinh-sach-tai-tro')"},
      {label:'COI', sub:'Xung đột lợi ích &amp; AI có kiểm soát', fn:"go('coi-ai')"},
      {label:'Chủ đề liên quan', sub:d.topic[1], fn:"go('chu-de','"+d.topic[0]+"')"}
    ];
    var h='';
    for(var j=0;j<cells.length;j++){h+='<a class="linkweb-cell" onclick="'+cells[j].fn+'"><b>'+cells[j].label+'</b><span>'+cells[j].sub+'</span></a>';}
    document.getElementById('skLinks').innerHTML=h;
  }

  // ===== Mega-menu accordion (mobile) =====
  function toggleSub(btn){
    var li = btn.parentNode;
    li.classList.toggle('open');
  }

  // ===== v6: overlay tìm kiếm mobile =====
  function openSearch(){
    var so=document.getElementById('searchOverlay');
    so.classList.add('open');
    var inp=document.getElementById('soInput');
    if(inp){setTimeout(function(){inp.focus();},60);}
  }
  function closeSearch(){
    document.getElementById('searchOverlay').classList.remove('open');
  }
  function submitSearch(e){
    e.preventDefault();
    closeSearch();
    go('tri-thuc');
    return false;
  }
  function searchChip(){
    closeSearch();
    go('tri-thuc');
  }

  // ===== v7: Xem trên điện thoại (nhấn #7) =====
  function openPhone(){
    var ov=document.getElementById('phoneOverlay');
    var fr=document.getElementById('phoneFrame');
    if(fr && !fr.getAttribute('src')){
      var base=location.href.split('#')[0].split('?')[0];
      fr.setAttribute('src', base + '?embed=1');
    }
    ov.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closePhone(){
    document.getElementById('phoneOverlay').classList.remove('open');
    document.body.style.overflow='';
  }

  // ===== v7: chế độ nhúng (?embed=1) — ẩn demobar + nút phone, tránh lồng vô hạn =====
  (function(){
    if(location.search.indexOf('embed=1') > -1){
      var db=document.querySelector('.demobar');
      if(db) db.style.display='none';
      var pf=document.getElementById('phoneFab');
      if(pf) pf.style.display='none';
    }
  })();

  // ===== v19-A: mega-panel "Bản đồ nội dung" (tầng ngoài) =====
  function openMap(){
    var ov=document.getElementById('mapOverlay');
    if(ov){ ov.classList.add('open'); document.body.style.overflow='hidden'; }
  }
  function closeMap(){
    var ov=document.getElementById('mapOverlay');
    if(ov && ov.classList.contains('open')){ ov.classList.remove('open'); document.body.style.overflow=''; }
  }
  // Esc đóng panel Khám phá (+ overlay tìm kiếm)
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape' || e.keyCode===27){ closeMap(); closeSearch(); }
  });

  // ===== v19-B1: điều khiển cỡ chữ vùng đọc (chuẩn người cao tuổi) — state runtime, KHÔNG localStorage =====
  var READ_SIZES = [18, 20, 22];   // px · 18→20→22
  var readIdx = 0;
  function readFont(d){
    if(d===0){ readIdx = 0; }
    else { readIdx = Math.max(0, Math.min(READ_SIZES.length-1, readIdx + d)); }
    document.documentElement.style.setProperty('--read-fs', READ_SIZES[readIdx] + 'px');
  }

  // ===== v19-B1/B2: chèn cụm cỡ chữ + thanh "Đọc tiếp an toàn" vào vùng người dân =====
  (function(){
    var READ_PAGES = ['article','article-dtd','article-dotquy','article-giammuoi','article-bmi',
      'article-tiemchung','article-giacngu','article-tamthan','article-bknly','article-socapcuu',
      'khi-nao','chu-de'];
    var ctlHTML = '<div class="readctl" role="group" aria-label="Điều chỉnh cỡ chữ vùng đọc">'
      + '<span class="rc-lb">Cỡ chữ</span>'
      + '<button type="button" class="rc-minus" onclick="readFont(-1)" aria-label="Giảm cỡ chữ">A−</button>'
      + '<button type="button" class="rc-reset" onclick="readFont(0)" aria-label="Cỡ chữ mặc định">A</button>'
      + '<button type="button" class="rc-plus" onclick="readFont(1)" aria-label="Tăng cỡ chữ">A+</button>'
      + '</div>';
    var nextHTML = '<div class="read-next" aria-label="Đọc tiếp an toàn">'
      + '<span class="rn-lb">Đọc tiếp an toàn</span>'
      + '<a class="rn-btn" onclick="go(\'tri-thuc\')">Chủ đề liên quan</a>'
      + '<a class="rn-btn rn-alert" onclick="go(\'khi-nao\')">Khi nào cần đi khám</a>'
      + '<a class="rn-btn" onclick="go(\'home\')">Về trang chủ</a>'
      + '</div>';
    for(var i=0;i<READ_PAGES.length;i++){
      var page = document.getElementById('page-' + READ_PAGES[i]);
      if(!page) continue;
      // vật chứa nội dung đọc: .article nếu có, nếu không lấy .wrap trong section
      var host = page.querySelector('.article') || page.querySelector('section .wrap');
      if(!host) continue;
      // chèn cụm cỡ chữ ngay sau tiêu đề h1 (góc đầu bài)
      var h1 = host.querySelector('h1');
      var ctl = document.createElement('div');
      ctl.innerHTML = ctlHTML;
      ctl = ctl.firstChild;
      if(h1){
        var head = h1.parentNode; // với chu-de là .chd-head (flex) → chèn sau cả khối head
        if(head && head.classList && head.classList.contains('chd-head')){
          head.parentNode.insertBefore(ctl, head.nextSibling);
        } else {
          h1.parentNode.insertBefore(ctl, h1.nextSibling);
        }
      } else {
        host.insertBefore(ctl, host.firstChild);
      }
      // thanh "Đọc tiếp an toàn" ở cuối vùng đọc
      var nx = document.createElement('div');
      nx.innerHTML = nextHTML;
      host.appendChild(nx.firstChild);
    }
  })();

  // init
  show('home');

  // ===== Banner carousel (big) — tự động chuyển =====
  var bannerCarousel = (function(){
    var track = null, dots = null, slides = 0, idx = 0, timer = null;
    function init(){
      track = document.getElementById('bcTrack');
      var dotsEl = document.getElementById('bcDots');
      if(!track || !dotsEl) return;
      dots = dotsEl.querySelectorAll('button');
      slides = dots.length;
      idx = 0;
      go(0);
      auto();
    }
    function go(n){
      idx = ((n % slides) + slides) % slides;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
      for(var i = 0; i < dots.length; i++) dots[i].classList.toggle('active', i === idx);
    }
    function next(){ go(idx + 1); resetAuto(); }
    function prev(){ go(idx - 1); resetAuto(); }
    function auto(){ timer = setInterval(next, 5000); }
    function resetAuto(){ clearInterval(timer); auto(); }
    var dotsEl = document.getElementById('bcDots');
    if(dotsEl){
      dotsEl.addEventListener('click', function(e){
        var b = e.target.closest('button');
        if(!b) return;
        go(parseInt(b.getAttribute('data-idx')));
        resetAuto();
      });
    }
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
    return { next: next, prev: prev };
  })();

  // ===== Back-to-top visibility (only show when scrolled past hero) =====
  (function(){
    var btn = document.querySelector('.back-to-top');
    if(!btn) return;
    window.addEventListener('scroll', function(){
      var heroH = window.innerHeight * 0.6;
      btn.classList.toggle('visible', window.pageYOffset > heroH);
    }, {passive:true});
  })();
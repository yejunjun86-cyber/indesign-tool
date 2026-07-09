#target indesign

// ============================================================
//  汉字与词语专项训练卷 - 自动排版脚本
//  基于 02_汉字与词语专项训练卷.docx 生成 | 适用于 InDesign 2026
//  使用方法：InDesign → 窗口 → 实用程序 → 脚本 → 右键执行
//
//  ⚠ 注意：本文档含图片（看拼音写词语图、连线图、看图写话图等），
//     脚本仅处理文字部分，图片需手动放置于标注位置。
// ============================================================

(function() {

    try {

        // ============ 配置区 ============
        // 文本框位置和尺寸（单位：mm）
        var TF1 = { x: 15,  y: 14, w: 185, h: 252.5 };
        var TF2 = { x: 220, y: 27, w: 185, h: 240.5 };

        // 如需更换模板文件，修改下方两处字符串
        var TEMPLATE_NAME = "智能期末试卷语文三年级-模板.idml";

        // ============ 工具函数 ============

        /**
         * 查找段落样式（支持样式组内搜索）
         */
        function getParaStyle(doc, styleName) {
            try {
                var s = doc.paragraphStyles.itemByName(styleName);
                if (s.isValid) return s;
            } catch (e) {}
            // 在样式组中递归搜索
            for (var i = 0; i < doc.paragraphStyleGroups.length; i++) {
                try {
                    var s = doc.paragraphStyleGroups[i].paragraphStyles.itemByName(styleName);
                    if (s.isValid) return s;
                } catch (e) {}
            }
            $.writeln("⚠ 未找到段落样式：「" + styleName + "」，将使用默认样式");
            return doc.paragraphStyles[0];
        }

        /**
         * 在故事末尾插入文本，并应用段落样式
         */
        function insertText(story, text, styleName, doc) {
            var ip = story.insertionPoints.lastItem();
            ip.contents = text;
            story.paragraphs.lastItem().appliedParagraphStyle = getParaStyle(doc, styleName);
        }

        /**
         * 在故事末尾插入一个回车（新段落）
         */
        function insertReturn(story) {
            story.insertionPoints.lastItem().contents = "\r";
        }

        // ============ 主流程 ============

        // 1. 打开模板文件
        var templateFile = File.openDialog(
            "请选择模板文件「" + TEMPLATE_NAME + "」",
            function(f) { return f instanceof Folder || /\.idml$/i.test(f.name); }
        );

        if (!templateFile) {
            alert("未选择文件，脚本终止。");
            return;
        }

        var doc = app.open(templateFile);
        $.writeln("✓ 已打开模板：" + templateFile.name);

        // 2. 设置度量单位为 mm（执行完毕恢复）
        var oldH = doc.viewPreferences.horizontalMeasurementUnits;
        var oldV = doc.viewPreferences.verticalMeasurementUnits;
        doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
        doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;

        // 创建文本框
        var page = doc.pages[0];

        var tf1 = page.textFrames.add({
            geometricBounds: [TF1.y, TF1.x, TF1.y + TF1.h, TF1.x + TF1.w]
        });
        var tf2 = page.textFrames.add({
            geometricBounds: [TF2.y, TF2.x, TF2.y + TF2.h, TF2.x + TF2.w]
        });

        // 文本串联
        tf1.nextTextFrame = tf2;

        var story = tf1.parentStory;

        // ============ 3. 数据驱动的文本插入 ============
        // 格式：[type, text, style]
        //   type = "t" → 插入文本并应用段落样式
        //   type = "r" → 插入回车（换行/空行）

        // ---- 构建插入列表 ----
        var items = [];

        // ===== 总标题 =====
        items.push(["t", "汉字与词语专项训练卷", "一级标题"]);
        items.push(["r"]);
        items.push(["r"]);

        // ===== 基础巩固 =====
        items.push(["t", "\u2605 基础巩固（共47分）", "二级标题"]);
        items.push(["r"]);
        items.push(["r"]);

        // ===== 一、看拼音，写词语（16分） =====
        items.push(["t", "一、看拼音，写词语。（每词2分，共16分）", "二级标题"]);
        items.push(["r"]);
        // [图] 看拼音写词语图片 ×1（需手动放置）
        items.push(["r"]);

        // ===== 二、选择正确读音（8分） =====
        items.push(["t", "二、给下列汉字选择正确的读音。（填序号，每空1分，共8分）", "二级标题"]);
        items.push(["r"]);

        items.push(["t", "\u2460 m\u01CE\u3000\u3000\u2461 b\u00E0\u3000\u3000\u2462 xu\u00E9\u3000\u3000\u2463 m\u0101\u3000\u3000\u2464 t\u01D4\u3000\u3000\u2465 b\u011Bn\u3000\u3000\u2466 x\u00ECng\u3000\u3000\u2467 l\u00F9", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "路（\u3000\u3000）\u3000\u3000本（\u3000\u3000）\u3000\u3000学（\u3000\u3000）\u3000\u3000姓（\u3000\u3000）", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "爸（\u3000\u3000）\u3000\u3000马（\u3000\u3000）\u3000\u3000妈（\u3000\u3000）\u3000\u3000土（\u3000\u3000）", "正文缩进"]);
        items.push(["r"]);
        items.push(["r"]);

        // ===== 三、看图连线（8分） =====
        items.push(["t", "三、寻宝图\u2014\u2014看图，连一连。（每对2分，共8分）", "二级标题"]);
        items.push(["r"]);
        // [图] 四幅连线图（目、耳、山、田）×4（需手动放置）
        items.push(["r"]);

        items.push(["t", "\u76EE\u3000\u3000\u3000\u3000\u8033\u3000\u3000\u3000\u3000\u5C71\u3000\u3000\u3000\u3000\u7530", "正文缩进"]);
        items.push(["r"]);
        items.push(["r"]);

        // ===== 四、选词填空（9分） =====
        items.push(["t", "四、选词填空。（每空1分，共9分）", "二级标题"]);
        items.push(["r"]);

        items.push(["t", "第一组：\u3000A. 忙着\u3000B. 连忙", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "\u2460 星期天，妈妈带我去姑妈家。姑妈正在阳台上（\u3000\u3000）浇花，见我们来了，（\u3000\u3000）下楼来迎接我们。", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "第二组：\u3000A. 小鱼\u3000B. 小山羊\u3000C. 小虾\u3000D. 燕子\u3000E. 老黄牛\u3000F. 蜻蜓", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "\u2461 （\u3000\u3000）和（\u3000\u3000）在水里游来游去。", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "\u2462 （\u3000\u3000）和（\u3000\u3000）在草地上吃草。", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "\u2463 （\u3000\u3000）和（\u3000\u3000）在空中飞来飞去。", "正文缩进"]);
        items.push(["r"]);
        items.push(["r"]);

        // ===== 五、看图连线（6分） =====
        items.push(["t", "五、找朋友\u2014\u2014把图和相应的汉字连起来。（每对1分，共6分）", "二级标题"]);
        items.push(["r"]);
        // [图] 六幅连线图（竹、狗、火、羊、耳、月）×6（需手动放置）
        items.push(["r"]);

        items.push(["t", "\u7AF9\u3000\u3000\u3000\u3000\u72D7\u3000\u3000\u3000\u3000\u706B\u3000\u3000\u3000\u3000\u7F8A\u3000\u3000\u3000\u3000\u8033\u3000\u3000\u3000\u3000\u6708", "正文缩进"]);
        items.push(["r"]);
        items.push(["r"]);

        // ===== 拔高提优 =====
        items.push(["t", "\u2605 拔高提优（共53分）", "二级标题"]);
        items.push(["r"]);
        items.push(["r"]);

        // ===== 六、选一选（15分） =====
        items.push(["t", "六、选一选。（在横线上填序号，每空2.5分，共15分）", "二级标题"]);
        items.push(["r"]);

        items.push(["t", "\u2460清\u3000\u2461请\u3000\u2462晴\u3000\u2463情\u3000\u2464睛", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "今天（\u3000\u3000）空万里，小青蛙心（\u3000\u3000）好，眨着大大的眼（\u3000\u3000），蹲在荷叶上唱歌。小鱼（\u3000\u3000）来小虾当听众，它们一边听，一边在（\u3000\u3000）（\u3000\u3000）的河水里游来游去。", "正文缩进"]);
        items.push(["r"]);
        items.push(["r"]);

        // ===== 七、一字多音（6分） =====
        items.push(["t", "七、一字多音真有趣！给加点字选填正确的读音。（每空1分，共6分）", "二级标题"]);
        items.push(["r"]);

        items.push(["t", "了（li\u01CEo\u3000le）", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "回家了（\u3000\u3000）\u3000\u3000\u3000\u3000了不起（\u3000\u3000）\u3000\u3000\u3000\u3000下雨了（\u3000\u3000）", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "得（de\u3000d\u011Bi）", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "跳得（\u3000\u3000）高\u3000\u3000\u3000\u3000热得（\u3000\u3000）很\u3000\u3000\u3000\u3000得（\u3000\u3000）有人帮忙", "正文缩进"]);
        items.push(["r"]);
        items.push(["r"]);

        // ===== 八、找反义词（12分） =====
        items.push(["t", "八、找一找句子中的反义词，填在括号里。（每题3分，共12分）", "二级标题"]);
        items.push(["r"]);

        items.push(["t", "（1）上周买的水果，梨子全坏了，幸好苹果还好好的。", "正文缩进"]);
        items.push(["r"]);
        items.push(["t", "（\u3000\u3000\u3000\u3000）\u2014\u2014（\u3000\u3000\u3000\u3000）", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "（2）最近天气温差大，晚上凉，要注意保暖。", "正文缩进"]);
        items.push(["r"]);
        items.push(["t", "（\u3000\u3000\u3000\u3000）\u2014\u2014（\u3000\u3000\u3000\u3000）", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "（3）乔乔和奶奶去超市买东西，重的奶奶提，轻的乔乔提。", "正文缩进"]);
        items.push(["r"]);
        items.push(["t", "（\u3000\u3000\u3000\u3000）\u2014\u2014（\u3000\u3000\u3000\u3000）", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "（4）气球一直飞啊飞，升到了高空中，三分钟后慢慢降在了河边的小树上。", "正文缩进"]);
        items.push(["r"]);
        items.push(["t", "（\u3000\u3000\u3000\u3000）\u2014\u2014（\u3000\u3000\u3000\u3000）", "正文缩进"]);
        items.push(["r"]);
        items.push(["r"]);

        // ===== 九、背一背，填一填（10分） =====
        items.push(["t", "九、背一背，填一填。（每空1分，共10分）", "二级标题"]);
        items.push(["r"]);
        // [图] 十幅填空题图片 ×10（需手动放置）
        items.push(["r"]);

        items.push(["t", "（1）（\u3000\u3000）心协力，（\u3000\u3000）甘共苦。", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "（2）（\u3000\u3000）风吹，雪花（\u3000\u3000）。（\u3000\u3000）中鱼，树上（\u3000\u3000）。", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "（3）\u201C日\u201D出（\u3000\u3000）里，\u201C水\u201D到（\u3000\u3000）净透。", "正文缩进"]);
        items.push(["r"]);
        items.push(["r"]);

        // ===== 十、看图写话（10分） =====
        items.push(["t", "十、看图写话。（共10分）", "二级标题"]);
        items.push(["r"]);
        // [图] 河边画画图 ×1（需手动放置）
        items.push(["r"]);

        items.push(["t", "仔细观察图片，根据提示写一写图画内容。不会写的字可以用拼音代替。", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "河边画画图", "小题干正文"]);
        items.push(["r"]);

        items.push(["t", "提示：图中有哪些人？在什么地方？在做什么？（写3～5句话）", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿", "正文缩进"]);
        items.push(["r"]);

        items.push(["t", "＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿", "正文缩进"]);
        items.push(["r"]);

        // ============ 4. 执行插入 ============
        var textCount = 0;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item[0] === "t") {
                insertText(story, item[1], item[2], doc);
                textCount++;
            } else if (item[0] === "r") {
                insertReturn(story);
            }
        }

        // 恢复度量单位
        doc.viewPreferences.horizontalMeasurementUnits = oldH;
        doc.viewPreferences.verticalMeasurementUnits = oldV;

        // ============ 完成 ============
        var msg = "✅ 脚本执行完成！\n\n";
        msg += "├ 已插入文本段：" + textCount + " 段\n";
        msg += "├ 文本框 1：" + TF1.x + "," + TF1.y + " → " + TF1.w + "×" + TF1.h + "mm\n";
        msg += "├ 文本框 2：" + TF2.x + "," + TF2.y + " → " + TF2.w + "×" + TF2.h + "mm\n";
        msg += "├ 文本框已串联\n";
        msg += "└ 模板文件：" + templateFile.name + "\n\n";
        msg += "⚠ 提示：本文档含多处图片（看拼音写词语图×1、连线图×10、\n";
        msg += "   看图写话图×1 等），脚本仅处理文字部分，图片需手动放置。";

        alert(msg);

    } catch (e) {
        alert("❌ 脚本执行出错：\n" + e.toString() + "\n\n行号：" + e.line);
    }

})();

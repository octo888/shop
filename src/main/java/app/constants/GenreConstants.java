package app.constants;

import java.util.ArrayList;
import java.util.List;

public class GenreConstants {

    public static final String KIDS1 = "Самым маленьким";
    public static final String KIDS2 = "Дошкольникам";
    public static final String KIDS3 = "Младший школьный возраст";
    public static final String KIDS4 = "Подростковая литература";
    public static final String CLASSIC = "Классика";

    public List<String> getGenresAsList() {
        List<String> list = new ArrayList<>();
        list.add(KIDS1);
        list.add(KIDS2);
        list.add(KIDS3);
        list.add(KIDS4);
        list.add(CLASSIC);
        return list;
    }
}

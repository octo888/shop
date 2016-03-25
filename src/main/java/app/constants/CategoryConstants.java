package app.constants;

import java.util.ArrayList;
import java.util.List;

public class CategoryConstants {

    public static final String BOOKS = "Книги";
    public static final String TSHIRTS = "Футболки";


    public List<String> getCategoriesAsList() {
        List<String> list = new ArrayList<>();
        list.add(BOOKS);
        list.add(TSHIRTS);
        return list;
    }
}